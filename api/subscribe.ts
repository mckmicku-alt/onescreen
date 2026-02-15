import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS dla Twojego frontu (localhost + domena)
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

    // Dodaj kontakt do listy w Brevo
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
        updateEnabled: true,
      }),
    });

    // Brevo zwraca czasem 201, a czasem 204/400/… — czytamy body jeśli jest
    const text = await r.text();
    if (!r.ok) {
      return res.status(400).json({ ok: false, error: "Brevo error", details: text });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: "Server error", details: String(e?.message || e) });
  }
}
