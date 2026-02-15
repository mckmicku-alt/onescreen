import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const { email, accepted } = req.body || {};

    if (!email || typeof email !== "string") {
      return res.status(400).json({ ok: false, error: "Email is required" });
    }
    if (!accepted) {
      return res.status(400).json({ ok: false, error: "Consent is required" });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listIdRaw = process.env.BREVO_LIST_ID;

    if (!apiKey) return res.status(500).json({ ok: false, error: "Missing BREVO_API_KEY" });
    if (!listIdRaw) return res.status(500).json({ ok: false, error: "Missing BREVO_LIST_ID" });

    const listId = Number(listIdRaw);
    if (!Number.isFinite(listId)) {
      return res.status(500).json({ ok: false, error: "BREVO_LIST_ID must be a number" });
    }

    const r = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true, // jeśli kontakt istnieje, ma go zaktualizować
      }),
    });

    const text = await r.text();

    // Jeśli Brevo odpowiada błędem, spróbuj wykryć duplikat
    if (!r.ok) {
      // Brevo często zwraca JSON w stringu: {"message":"...","code":"..."}
      let parsed: any = null;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }

      const msg = String(parsed?.message || text || "").toLowerCase();
      const code = String(parsed?.code || "").toLowerCase();

      // typowe przypadki duplikatu
      const isDuplicate =
        code.includes("duplicate") ||
        msg.includes("already exist") ||
        msg.includes("already exists") ||
        msg.includes("duplicate");

      if (isDuplicate) {
        return res.status(409).json({ ok: false, error: "Email already subscribed" });
      }

      return res.status(r.status).json({ ok: false, error: "Brevo error", details: text });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: "Server error", details: String(e?.message || e) });
  }
}
