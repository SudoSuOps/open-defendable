// Cloudflare Pages Function · POST /api/contact
//
// Founder-routed contact lane for opendefendable.com.

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    return json({ error: "RESEND_API_KEY not configured" }, 503);
  }

  const TO = env.CONTACT_TO_EMAIL || "build@swarmandbee.ai";
  const FROM = env.CONTACT_FROM_EMAIL || "build@swarmandbee.ai";

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const name = sanitize(body.name, 200);
  const email = sanitize(body.email, 320);
  const company = sanitize(body.company, 200);
  const message = sanitize(body.message, 5000);

  if (!name || !email || !message) {
    return json({ error: "name · email · message are required" }, 400);
  }
  if (!isEmail(email)) {
    return json({ error: "Invalid email" }, 400);
  }
  if (message.length < 10) {
    return json({ error: "Message too short" }, 400);
  }

  const timestamp = new Date().toISOString();
  const subject = `[OPENDEFENDABLE] ${name}${company ? ` · ${company}` : ""}`;
  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    "",
    "Message:",
    "─────────",
    message,
    "─────────",
    "",
    `(sent via opendefendable.com · ${timestamp})`,
  ].filter(Boolean).join("\n");

  const html = `
    <div style="font-family:ui-monospace,Menlo,monospace;color:#222;line-height:1.55;max-width:640px">
      <div style="border-left:3px solid #e8b65a;padding:0 0 0 14px;margin-bottom:18px">
        <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#a87f33;font-weight:600">OpenDefendable contact</div>
        <div style="font-size:16px;font-weight:600;margin-top:4px">${escape(name)}${company ? ` · ${escape(company)}` : ""}</div>
        <div style="font-size:13px;color:#666">${escape(email)}</div>
      </div>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace;font-size:14px;color:#222;background:#fafafa;border:1px solid #eee;border-radius:6px;padding:14px;margin:0">${escape(message)}</pre>
      <div style="font-size:11px;color:#999;margin-top:18px">via opendefendable.com · ${timestamp}</div>
    </div>
  `.trim();

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("Resend error", resendRes.status, errBody);
      return json({ error: `Mail provider returned ${resendRes.status}` }, 502);
    }
    return json({ ok: true });
  } catch (err: unknown) {
    console.error("Resend network error", err);
    return json({ error: "Network failure to mail provider" }, 502);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function sanitize(s: string | undefined, max: number): string {
  if (!s || typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
