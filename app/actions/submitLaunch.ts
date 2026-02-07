"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitLaunchForm(formData: FormData) {
  const launchData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    linkedin: formData.get("linkedin") as string,
    domain: formData.get("domain") as string,
    info: formData.get("info") as string,
    notes: formData.get("notes") as string,
    timestamp: new Date().toISOString(),
  }

  try {
    await resend.emails.send({
      from: "contact@kirkwessman.com", // You must have this verified in Resend
      to: "kwessman@gmail.com",
      subject: `New Launch Request from ${launchData.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #2563eb;">🚀 New Website Launch Request</h2>
          <p><strong>Name:</strong> ${launchData.name}</p>
          <p><strong>Email:</strong> ${launchData.email}</p>
          <p><strong>LinkedIn:</strong> ${launchData.linkedin}</p>
          <p><strong>Domain:</strong> ${launchData.domain}</p>
          <p><strong>Info:</strong><br/>${launchData.info.replace(/\n/g, "<br/>")}</p>
          <p><strong>Notes:</strong><br/>${launchData.notes.replace(/\n/g, "<br/>")}</p>
          <p><em>Submitted at ${launchData.timestamp}</em></p>
        </div>
      `,
      replyTo: launchData.email,
    })

    return { success: true }
  } catch (error) {
    console.error("Resend error:", error)
    return { success: false }
  }
}
