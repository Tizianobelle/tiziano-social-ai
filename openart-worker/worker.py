import os,time,subprocess,json,urllib.request
BASE=os.environ["SUPABASE_URL"].rstrip("/")
ANON=os.environ["SUPABASE_ANON_KEY"]
EMAIL=os.environ["TIZIANO_SOCIAL_EMAIL"]
PASSWORD=os.environ["TIZIANO_SOCIAL_PASSWORD"]
INTERVAL=int(os.getenv("OPENART_POLL_SECONDS","20"))

def post(url,payload,headers):
    req=urllib.request.Request(url,data=json.dumps(payload).encode(),headers={**headers,"Content-Type":"application/json"},method="POST")
    with urllib.request.urlopen(req,timeout=60) as r:return json.loads(r.read())

def login():
    return post(BASE+"/auth/v1/token?grant_type=password",{"email":EMAIL,"password":PASSWORD},{"apikey":ANON})["access_token"]

def fn(token,payload):
    return post(BASE+"/functions/v1/tiziano-social-content",payload,{"apikey":ANON,"Authorization":"Bearer "+token})

def run_cli(r):
    kind="video" if r["media_type"]=="video" else "image"
    cmd=["openart","generate",kind,r["prompt"],"--json"]
    if r.get("model") and r["model"]!="automatic": cmd += ["--model",r["model"]]
    p=subprocess.run(cmd,capture_output=True,text=True,check=True)
    data=json.loads(p.stdout)
    hid=data.get("historyId") or data.get("history_id")
    if not hid: raise RuntimeError("OpenArt non ha restituito historyId")
    # bounded polling through CLI; CLI owns OAuth refresh
    for _ in range(90):
        q=subprocess.run(["openart","creation","get",hid,"--json"],capture_output=True,text=True,check=True)
        d=json.loads(q.stdout); st=str(d.get("status","")).upper()
        if st=="COMPLETED":
            resources=d.get("resources") or []
            if not resources or not resources[0].get("url"): raise RuntimeError("Output OpenArt senza URL")
            return hid,resources[0]["url"],resources[0]
        if st in ("FAILED","CANCELLED"): raise RuntimeError(d.get("error") or st)
        time.sleep(10)
    raise RuntimeError("Timeout OpenArt")

while True:
    try:
        token=login()
        jobs=fn(token,{"action":"list_openart_requests","limit":20}).get("requests",[])
        for r in [x for x in jobs if x.get("status")=="queued"]:
            try:
                hid,url,meta=run_cli(r)
                fn(token,{"action":"complete_openart_request","request_id":r["id"],"provider_history_id":hid,"url":url,"metadata":meta})
            except Exception as e:
                print("job",r.get("id"),"failed:",e,flush=True)
    except Exception as e: print("worker error:",e,flush=True)
    time.sleep(INTERVAL)
