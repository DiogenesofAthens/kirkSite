#!/usr/bin/env node
/**
 * Demo URL health monitor.
 *
 * Checks each project's live demo URL (and key API health endpoints) and
 * sends an email alert when any of them returns a non-2xx response or
 * fails to connect. Exits 1 on any failure so CI schedulers (GitHub
 * Actions) also flag the run.
 *
 * Alert transport — first available wins:
 *   1. Resend  — set RESEND_API_KEY (+ optional ALERT_TO, default kwessman@gmail.com)
 *   2. SMTP    — set SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / ALERT_TO
 *
 * Run manually:
 *   node scripts/check-demos.mjs
 *
 * Runs nightly via .github/workflows/demo-monitor.yml
 */

const DEMOS = [
  { name: "kirkwessman.com",          url: "https://kirkwessman.com" },
  { name: "StatTrack",                url: "https://stattrack-sandy.vercel.app/" },
  { name: "fareTrader",               url: "https://fare-trader.vercel.app/" },
  { name: "ResourXe",                 url: "https://resourxe.vercel.app/" },
  { name: "ResourXe API",             url: "https://resourxe.vercel.app/api/health" },
  { name: "Save the State",           url: "https://save-the-state.vercel.app/" },
  { name: "Save the State API",       url: "https://save-the-state.vercel.app/api/health" },
  { name: "PortKey",                  url: "https://portkey-one.vercel.app/" },
  { name: "re-open.us",               url: "https://reopen.us" },
  { name: "Prince of Mulberry",       url: "https://www.princeofmulberry.com/" },
]

const TIMEOUT_MS = 15_000

async function checkUrl(name, url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: "follow" })
    clearTimeout(timer)
    if (!res.ok) {
      return { name, url, ok: false, reason: `HTTP ${res.status} ${res.statusText}` }
    }
    return { name, url, ok: true }
  } catch (err) {
    clearTimeout(timer)
    const reason = err.name === "AbortError" ? `Timed out after ${TIMEOUT_MS / 1000}s` : err.message
    return { name, url, ok: false, reason }
  }
}

function buildAlertBody(failures) {
  const lines = failures.map(f => `• ${f.name}: ${f.reason}\n  ${f.url}`).join("\n\n")
  return {
    subject: `[kirkwessman.com] ${failures.length} demo${failures.length > 1 ? "s" : ""} down`,
    text: `The following live demo${failures.length > 1 ? "s are" : " is"} unreachable:\n\n${lines}\n\nChecked at ${new Date().toISOString()}`,
  }
}

async function sendViaResend(failures) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const to = process.env.ALERT_TO || "kwessman@gmail.com"
  const { subject, text } = buildAlertBody(failures)
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Demo Monitor <onboarding@resend.dev>",
      to,
      subject,
      html: `<pre style="font-family:monospace;">${text}</pre>`,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
  console.log(`Alert sent via Resend to ${to}`)
  return true
}

async function sendViaSmtp(failures) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ALERT_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ALERT_TO) return false

  const { default: nodemailer } = await import("nodemailer")
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const { subject, text } = buildAlertBody(failures)
  await transporter.sendMail({ from: SMTP_USER, to: ALERT_TO, subject, text })
  console.log(`Alert sent via SMTP to ${ALERT_TO}`)
  return true
}

async function sendAlert(failures) {
  if (await sendViaResend(failures)) return
  if (await sendViaSmtp(failures)) return
  console.error("No alert transport configured (set RESEND_API_KEY or SMTP_* env vars) — skipping email alert.")
}

async function main() {
  console.log(`[${new Date().toISOString()}] Checking ${DEMOS.length} demo URLs...`)
  const results = await Promise.all(DEMOS.map(d => checkUrl(d.name, d.url)))

  for (const r of results) {
    console.log(`  ${r.ok ? "✓" : "✗"} ${r.name}${r.ok ? "" : ` — ${r.reason}`}`)
  }

  const failures = results.filter(r => !r.ok)
  if (failures.length > 0) {
    console.log(`\n${failures.length} failure(s) detected. Sending alert...`)
    await sendAlert(failures)
    process.exit(1)
  }
  console.log("\nAll demos healthy.")
}

main().catch(err => {
  console.error("Monitor crashed:", err)
  process.exit(1)
})
