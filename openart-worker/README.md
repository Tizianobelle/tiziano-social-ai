# OpenArt OAuth Worker

Questo worker completa il bridge tra la coda Supabase `tiziano_social_ai.openart_generation_requests` e OpenArt CLI.

## Perché gira su un host persistente
OpenArt CLI usa OAuth PKCE e salva/aggiorna la credenziale in `~/.openart/cli-credentials.json`. Un runtime effimero come una Edge Function non è adatto a conservare questa sessione. Il worker va quindi eseguito su un PC/VPS persistente.

## Setup
1. Installa OpenArt CLI seguendo la documentazione ufficiale.
2. Esegui una volta: `openart login`.
3. Imposta localmente (NON nel repository):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `TIZIANO_SOCIAL_EMAIL`
   - `TIZIANO_SOCIAL_PASSWORD`
4. Avvia: `python openart-worker/worker.py`

Il worker non pubblica sui social. Prende solo richieste media in coda, genera con OpenArt e riporta URL/history id nel backend.
