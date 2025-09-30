"use server"

import { Resend } from "resend"
import { z } from "zod"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  message: z.string().min(1, { message: "Please enter a message" }),
})

type FormData = z.infer<typeof formSchema>

export async function sendEmail(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Get API key from environment variable
    const apiKey = process.env.RESEND_API_KEY

    // Check if API key exists
    if (!apiKey) {
      console.error("Resend API key is missing")
      return {
        success: false,
        message: "Email configuration error. Please contact the administrator.",
      }
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey)

    // Prepare email content
    const { name, email, phone, message } = validatedData

    // For debugging
    console.log("Sending email with Resend...")

    // Send email
    const { data, error } = await resend.emails.send({
      from: "website@neilalliston.com",
      to: "neil@neilalliston.com",
      subject: `New enquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Message:
${message}
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
  <h3>Message:</h3>
  <p>${message.replace(/\n/g, "<br>")}</p>
</div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        success: false,
        message: `Failed to send your message: ${error.message}`,
      }
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
    }
  } catch (error) {
    console.error("Error in sendEmail:", error)
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const fieldErrors = error.errors.reduce(
        (acc, curr) => {
          const field = curr.path[0] as string
          acc[field] = curr.message
          return acc
        },
        {} as Record<string, string>,
      )

      return {
        success: false,
        message: "Please check the form for errors.",
        fieldErrors,
      }
    }

    // Include more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return {
      success: false,
      message: `An error occurred: ${errorMessage}`,
    }
  }
}
