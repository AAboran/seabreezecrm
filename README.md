# Boran&Co CRM

Internal CRM for the Sea Breeze corridor. This is the **clean** build: no leads,
no partners, no visits — ready for you to fill in. It ships with two accounts
(one administrator, one office worker) and a built-in AI help assistant.

The app runs in the browser and stores its data in that browser's local storage.
There is nothing to build.

## Deploy on Vercel
1. Put every file in this folder (keep the `api/` folder!) at the **root** of a Git
   repository and push it.
2. In Vercel: **Add New… → Project → Import** the repository.
3. Framework preset **Other**. No build command. Output directory: root (`./`).
4. **Deploy.** Vercel serves `index.html` and runs `api/assistant.js` automatically.

## Turn on the AI assistant (about 2 minutes)
The assistant answers staff/partners' questions about how to use the CRM. It needs
an Anthropic API key, which stays on the server and is never shown to users.

1. Create a key at **console.anthropic.com** (API Keys → Create Key). It starts with `sk-ant-...`.
2. In Vercel: **Project → Settings → Environment Variables → Add**:
   - Name: `ANTHROPIC_API_KEY`  Value: your key.  (Apply to Production, Preview, Development.)
   - *(Optional)* Name: `AI_MODEL`  Value: `claude-haiku-4-5` (default) or `claude-sonnet-4-6` for higher quality.
3. **Redeploy** (Deployments → ⋯ → Redeploy) so the new variable takes effect.

Until the key is added, the Assistant screen politely says it isn't switched on yet.
Cost: each question is a small API call. Haiku is the cheapest; Sonnet costs more but
answers a little more thoroughly.

## Your accounts (change the codes before sharing the link!)
Defined in `index.html` (search for the `users` list in the seed section):
- Administrator — username `anar`, access code `boran2026`
- Office worker — username `office`, access code `office2026`

You can also add/remove accounts inside the app: **Users & roles** (administrator only).

## User manuals (built in)
Each role can download its own manual from inside the app — there is a
"Download user manual" link at the bottom of the left menu, and a download card
at the top of the Assistant screen. The right manual is served automatically:
- Administrators get the Administrator manual (and links to the other two).
- Office workers get the Office Worker manual.
- Partners get the Partner manual.

The PDFs live in the `manuals/` folder and must stay in the repository for the
in-app links to work.

## Files
- `index.html` — the whole application (crest favicon embedded).
- `api/assistant.js` — the AI assistant backend (holds the key server-side).
- `manuals/administrator-manual.pdf`, `manuals/office-worker-manual.pdf`, `manuals/partner-manual.pdf` — the role manuals the app links to.
- `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` — icons.
- `vercel.json` — clean URLs + basic security headers.

## Note on data
Records live in each browser's local storage, so they are per-device and are erased
if the browser's data is cleared. This is ideal as a working tool. For shared,
multi-user data with central storage, the records would need a server — plan that
as a later step.
