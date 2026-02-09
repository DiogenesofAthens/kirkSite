"use server"

import { Resend } from "resend"

// Initialize Resend (you'll need to add RESEND_API_KEY to your environment variables)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  const contactData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: (formData.get("company") as string) || "Not provided",
    message: formData.get("message") as string,
    timestamp: new Date().toISOString(),
    source: (formData.get("source") as string) || "Website Contact Form",
  }

  try {
    // Send email using Resend
    // Note: Resend SDK returns { data, error } instead of throwing on API errors
    const { data, error } = await resend.emails.send({
      from: "Kirk Wessman Site <onboarding@resend.dev>",
      to: "kwessman+inbound@gmail.com",
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Contact Information</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Company:</strong> ${contactData.company}</p>
            <p><strong>Source:</strong> ${contactData.source}</p>
            <p><strong>Submitted:</strong> ${new Date(contactData.timestamp).toLocaleString()}</p>
          </div>

          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #334155;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Reply directly to this email to respond to ${contactData.name}</strong>
            </p>
          </div>
        </div>
      `,
      replyTo: contactData.email,
    })

    if (error) {
      console.error("Resend API error:", error)
      return {
        success: false,
        message: "Something went wrong sending your message. Please try again or email kwessman@gmail.com directly.",
      }
    }

    console.log("Email sent successfully:", data)

    return {
      success: true,
      message: "Thank you for your message! Kirk will get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Error sending email:", error)

    return {
      success: false,
      message: "Something went wrong sending your message. Please try again or email kwessman@gmail.com directly.",
    }
  }
}
