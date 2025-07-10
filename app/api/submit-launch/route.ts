import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, linkedin, domain, info, notes } = body

    const message = `
🚀 New Launchpad Request

👤 Name: ${name}
📧 Email: ${email}
🔗 LinkedIn: ${linkedin || "N/A"}
🌐 Domain: ${domain || "N/A"}

📄 Website Info:
${info}

📁 Additional Notes:
${notes || "None"}
`

    const data = await resend.emails.send({
      from: "Launchpad Form <noreply@grantglazer.com>",
      to: "wildhorserockwell@gmail.com",
      subject: "🚀 New Digital Identity Launch Request",
      text: message,
    })

    return NextResponse.json({ message: "Email sent!", data }, { status: 200 })
  } catch (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }
}
