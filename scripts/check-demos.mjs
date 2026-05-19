#!/usr/bin/env node
/**
 * Demo URL health monitor.
 *
 * Checks each project's live demo URL and sends an email alert via SMTP
 * when any of them returns a non-2xx response or fails to connect.
 *
 * Required environment variables:
 *   SMTP_HOST       e.g. smtp.gmail.com
 *   SMTP_PORT       e.g. 587
 *   SMTP_USER       your sending email address
 *   SMTP_PASS       your SMTP password / app password
 *   ALERT_TO        email address to receive alerts
 *
 * Run manually:
 *   node scripts/check-demos.mjs
 *
 * Run on a schedule (cron example — every 30 minutes):
 *   */30 * * * * cd /path/to/kirkSite && node scripts/check-demos.mjs >> logs/demo-monitor.log 2>&1
 */

import nodemailer from "nodemailer"

const DEMOS = [
  { name: "StatTrack",      url: "https://stattrack-sandy.vercel.app/" },
  { name: "fareTrader",     url: "https://fare-trader.vercel.app/" },
  { name: "ResourXe",       url: "https://resourxe.vercel.app/" },
  { name: "Save the State", url: "https://save-the-state.vercel.app/" },
  { name: "PortKey",        url: "https://portkey-one.vercel.app/" },
  { name: "re-open.us",     url: "https://reopen.us" },
]

const TIMEOUT_MS = 10_000

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

async function sendAlert(failures) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ALERT_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ALERT_TO) {
    console.error("Missing SMTP env vars — skipping email alert.")
    return
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const lines = failures.map(f => `• ${f.name}: ${f.reason}\n  ${f.url}`).join("\n\n")
  const subject = `[kirkwessman.com] ${failures.length} demo${failures.length > 1 ? "s" : ""} down`
  const text = `The following live demo${failures.length > 1 ? "s are" : " is"} unreachable:\n\n${lines}\n\nChecked at ${new Date().toISOString()}`

  await transporter.sendMail({ from: SMTP_USER, to: ALERT_TO, subject, text })
  console.log(`Alert sent to ${ALERT_TO}`)
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
  } else {
    console.log("\nAll demos healthy.")
  }
}

main().catch(err => {
  console.error("Monitor crashed:", err)
  process.exit(1)
})
