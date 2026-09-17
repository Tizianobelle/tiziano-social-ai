import {readFile,writeFile} from 'node:fs/promises';

const mobileCss=`<style id="mobile-first-v1">
.mobile-menu-btn,.mobile-close{display:none}
@media(max-width:900px){
 body{overflow-x:hidden}.app{display:block;min-height:100vh}.main{padding:76px 14px 24px;width:100%;overflow:hidden}
 .side{display:block!important;position:fixed;inset:0 auto 0 0;width:min(86vw,330px);height:100dvh;z-index:1001;transform:translateX(-105%);transition:transform .22s ease;overflow-y:auto;padding:20px 14px 30px;box-shadow:12px 0 35px rgba(0,0,0,.4)}
 body.mobile-nav-open .side{transform:translateX(0)}body.mobile-nav-open{overflow:hidden}
 body.mobile-nav-open:after{content:'';position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:1000}
 .mobile-menu-btn{display:flex;position:fixed;top:12px;left:12px;z-index:999;align-items:center;gap:8px;background:#122743;color:#fff;border:1px solid #2c527b;border-radius:12px;padding:11px 14px;font-weight:800;font-size:15px;min-height:46px}
 .mobile-close{display:block;position:absolute;right:12px;top:12px;background:#173657;color:#fff;border:0;border-radius:10px;width:42px;height:42px;font-size:22px}
 .brand{padding-right:44px;margin-bottom:22px}.nav button{min-height:48px;font-size:15px;padding:13px 12px}
 .top{align-items:flex-start;gap:10px;flex-wrap:wrap}.top h1{font-size:26px}.badge{font-size:12px;padding:7px 9px}
 .grid,.status{grid-template-columns:1fr!important}.grid{gap:12px}.status{gap:10px}.card{padding:15px;border-radius:15px}.metric strong{font-size:24px}
 .actions{grid-template-columns:repeat(2,minmax(0,1fr))!important}.action{min-height:62px;display:flex;align-items:center;justify-content:center;flex-direction:column}
 select,textarea,input,.btn{font-size:16px}.btn{min-height:46px}.tabs{overflow-x:auto}.phone{width:100%;max-width:390px}
 .history-head{align-items:flex-start;flex-direction:column}.history-item{grid-template-columns:1fr!important}.workflow{padding:12px}
 [style*="display:flex"]{max-width:100%}img,video{max-width:100%}
}
@media(max-width:420px){.main{padding-left:10px;padding-right:10px}.card{padding:13px}.actions{gap:7px}.phone{border-radius:18px}}
</style>`;
const mobileJs=`<script id="mobile-nav-v1">
(function(){
 function init(){
  if(document.querySelector('.mobile-menu-btn'))return;
  const side=document.querySelector('.side'); if(!side)return;
  const open=document.createElement('button');open.className='mobile-menu-btn';open.type='button';open.setAttribute('aria-label','Apri menu');open.innerHTML='☰ <span>Menu</span>';
  const close=document.createElement('button');close.className='mobile-close';close.type='button';close.setAttribute('aria-label','Chiudi menu');close.textContent='×';side.prepend(close);document.body.appendChild(open);
  const shut=()=>document.body.classList.remove('mobile-nav-open');open.onclick=()=>document.body.classList.add('mobile-nav-open');close.onclick=shut;
  side.addEventListener('click',e=>{if(e.target.closest('button')&&!e.target.closest('.mobile-close'))setTimeout(shut,80)});
  document.addEventListener('click',e=>{if(document.body.classList.contains('mobile-nav-open')&&!side.contains(e.target)&&!open.contains(e.target))shut()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')shut()});
 }
 document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();
</script>`;
for(const file of ['index.html','openart-studio.html']){
 let html=await readFile(file,'utf8');
 if(!html.includes('mobile-first-v1')) html=html.replace('</head>',mobileCss+'</head>');
 if(!html.includes('mobile-nav-v1')) html=html.replace('</body>',mobileJs+'</body>');
 await writeFile(file,html);
}
