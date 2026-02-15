import type { VercelRequest, VercelResponse } from "@vercel/node";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

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

    const e = normalizeEmail(email);

    // 1) Najpierw sprawdź czy kontakt istnieje
    const getUrl = `https://api.brevo.com/v3/contacts/${encodeURIComponent(e)}`;
    const getResp = await fetch(getUrl, {
      method: "GET",
      headers: { "api-key": apiKey, accept: "application/json" },
    });

    if (getResp.ok) {
      const existing = await getResp.json().catch(() => null);
      const currentLists: number[] = Array.isArray(existing?.listIds) ? existing.listIds : [];

      // jeśli już jest w naszej liście → 409
      if (currentLists.includes(listId)) {
        return res.status(409).json({ ok: false, error: "Email already on the list" });
      }

      // jeśli istnieje, ale nie jest na liście → dodaj do listy (PUT update)
      const putResp = await fetch(getUrl, {
        method: "PUT",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          listIds: [...new Set([...currentLists, listId])],
        }),
      });

      const putText = await putResp.text();
      if (!putResp.ok) {
        return res.status(putResp.status).json({ ok: false, error: "Brevo error", details: putText });
      }

      return res.status(200).json({ ok: true });
    }

    // Jeśli GET zwróci 404 → kontakt nie istnieje, tworzymy nowy
    if (getResp.status === 404) {
      const createResp = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: e,
          listIds: [listId],
          updateEnabled: true,
        }),
      });

      const createText = await createResp.text();
      if (!createResp.ok) {
        return res.status(createResp.status).json({ ok: false, error: "Brevo error", details: createText });
      }

      return res.status(200).json({ ok: true });
    }

    // Inne błędy GET
    const getText = await getResp.text().catch(() => "");
    return res.status(getResp.status).json({ ok: false, error: "Brevo error", details: getText });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: "Server error", details: String(e?.message || e) });
  }
}
