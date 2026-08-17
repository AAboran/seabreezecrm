# Boran&Co CRM

Single-file internal CRM for the Sea Breeze corridor. Pure client-side app
(HTML + JS, data stored in the browser's localStorage). No backend required.

## Deploy on Vercel
1. Push this folder to a Git repository (GitHub / GitLab / Bitbucket).
2. In Vercel: **Add New… → Project → Import** the repository.
3. Framework preset: **Other**. Build command: none. Output directory: leave as root ("./").
4. **Deploy.** Vercel serves `index.html` at the root URL.

That is the whole deployment — there is nothing to build.

## Files
- `index.html` — the entire application (favicon embedded, self-contained).
- `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` — icons,
  also referenced from the HTML for browsers that request them by path.
- `vercel.json` — clean URLs + basic security headers (optional).

## Accounts
Accounts and access codes are defined inside `index.html` (the `users` array,
in the seed section). Change them there before sharing the URL. The sign-in
screen no longer displays any credentials.

## Note on data & security
This prototype keeps all data in each browser's localStorage and holds access
codes in the page. It is suitable for demonstration and single-machine use. For
multi-user production with real authentication and shared data, the accounts and
records belong on a server behind a proper login.
