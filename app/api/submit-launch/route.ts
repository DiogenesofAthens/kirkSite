import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, linkedin, domain, info, notes } = body

    const text = `
🚀 New Digital Identity Launch Request

👤 Name: ${name}
📧 Email: ${email}
🔗 LinkedIn: ${linkedin || "N/A"}
🌐 Domain: ${domain || "N/A"}

📄 Website Info:
${info}

📝 Notes:
${notes || "None"}
    `

    const data = await resend.emails.send({
      from: "Launchpad <onboarding@resend.dev>",
      to: "edgewaterglazer@gmail.com",
      subject: "New Personal Website Launch Request",
      text,
    })

    return NextResponse.json({ message: "Email sent successfully", data }, { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ message: "Failed to send email", error }, { status: 500 })
  }
}
