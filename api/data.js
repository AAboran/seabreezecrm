// Boran&Co CRM — shared data store (Vercel serverless function)
// Stores the whole CRM database in a Redis key so every user/device shares it.
// Works with Vercel KV or Upstash Redis. Set these env vars (Vercel adds them
// automatically when you connect a KV / Upstash store to the project):
//   KV_REST_API_URL + KV_REST_API_TOKEN            (Vercel KV)
//   or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash)
// If none are set, the endpoint reports "not_configured" and the app falls back
// to per-device local storage.

const KEY = "boranco_crm_db";

module.exports = async function handler(req, res) {
  const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!URL || !TOKEN) { res.status(200).json({ error: "not_configured" }); return; }

  async function cmd(arr) {
    const r = await fetch(URL, {
      method: "POST",
      headers: { "Authorization": "Bearer " + TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify(arr)
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error((d && d.error) || ("HTTP " + r.status));
    return d.result;
  }

  try {
    if (req.method === "GET") {
      const val = await cmd(["GET", KEY]);
      let data = null;
      if (val) { try { data = JSON.parse(val); } catch (e) { data = null; } }
      res.status(200).json({ ok: true, data });
      return;
    }
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
      const db = body && body.data;
      if (db == null) { res.status(400).json({ error: "no_data" }); return; }
      const str = JSON.stringify(db);
      if (str.length > 1000000) { res.status(200).json({ error: "too_large" }); return; }
      await cmd(["SET", KEY, str]);
      res.status(200).json({ ok: true, v: (db && db._v) || 0 });
      return;
    }
    res.status(405).json({ error: "method_not_allowed" });
  } catch (e) {
    res.status(200).json({ error: "api_error", detail: String(e).slice(0, 200) });
  }
};
