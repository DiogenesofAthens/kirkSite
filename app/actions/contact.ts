"use server"

export async function submitContactForm(formData: FormData) {
  // Simulate email sending - in production, you'd use a service like Resend, SendGrid, etc.
  const contactData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    message: formData.get("message") as string,
    timestamp: new Date().toISOString(),
  }

  // In production, send email to edgewaterglazer@gmail.com
  console.log("Contact form submission:", contactData)

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    message: "Thank you for your message! Grant will get back to you within 24 hours.",
  }
}
