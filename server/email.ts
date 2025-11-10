import nodemailer from "nodemailer";
import type { ApplicationForm, ContactForm } from "@shared/schema";

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER || "noreply@skilinerecruitment.com";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "info@skilinerecruitment.com";

// Create transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  // If credentials are not configured, use a no-op transporter
  if (!EMAIL_PASSWORD) {
    console.log("⚠️  Email credentials not configured. Using no-op transporter.");
    // Create a fake transporter that doesn't actually send
    transporter = {
      sendMail: async () => {
        console.log("📧 Email would be sent (no-op mode - credentials not configured)");
        return { messageId: 'no-op' };
      }
    } as any;
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  return transporter;
}

// Format application data for email
function formatApplicationEmail(application: ApplicationForm): string {
  const categoryNames = {
    retired: "Retired Professional",
    housewife: "Housewife (35+)",
    telecalling: "Telecalling (Female, 20-25)",
    field: "Field Executive (20-30)",
  };

  let html = `
    <h2>New Application Submission - ${categoryNames[application.category]}</h2>
    <hr />
    <h3>Applicant Details:</h3>
    <p><strong>Name:</strong> ${application.name}</p>
    <p><strong>Date of Birth:</strong> ${application.dateOfBirth}</p>
    <p><strong>Contact Number:</strong> ${application.contactNumber}</p>
    <p><strong>Email:</strong> ${application.email}</p>
    <p><strong>Education Qualification:</strong> ${application.educationQualification}</p>
  `;

  if (application.category === "retired") {
    html += `
      <p><strong>Last Designation:</strong> ${application.lastDesignationTitle}</p>
      <p><strong>Years of Experience:</strong> ${application.yearsOfExperience}</p>
    `;
  }

  html += `
    <hr />
    <p style="color: #666; font-size: 14px;">
      This application was submitted through the Skiline Recruitment website.
    </p>
  `;

  return html;
}

// Format contact form data for email
function formatContactEmail(contact: ContactForm): string {
  return `
    <h2>New Contact Form Submission</h2>
    <hr />
    <h3>Contact Details:</h3>
    <p><strong>Name:</strong> ${contact.name}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
      ${contact.message}
    </p>
    <hr />
    <p style="color: #666; font-size: 14px;">
      This message was sent through the Skiline Recruitment contact form.
    </p>
  `;
}

// Send application email
export async function sendApplicationEmail(application: ApplicationForm): Promise<void> {
  const transport = getTransporter();

  const categoryNames = {
    retired: "Retired Professional",
    housewife: "Housewife (35+)",
    telecalling: "Telecalling",
    field: "Field Executive",
  };

  try {
    await transport.sendMail({
      from: `"Skiline Recruitment" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Application: ${categoryNames[application.category]} - ${application.name}`,
      html: formatApplicationEmail(application),
    });
    
    console.log("✅ Application email sent successfully to", RECIPIENT_EMAIL);
  } catch (error) {
    console.error("❌ Failed to send application email:", error);
    throw new Error("Failed to send application email");
  }
}

// Send contact form email
export async function sendContactEmail(contact: ContactForm): Promise<void> {
  const transport = getTransporter();

  try {
    await transport.sendMail({
      from: `"Skiline Recruitment" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: contact.email,
      subject: `Contact Form: ${contact.name}`,
      html: formatContactEmail(contact),
    });
    
    console.log("✅ Contact email sent successfully to", RECIPIENT_EMAIL);
  } catch (error) {
    console.error("❌ Failed to send contact email:", error);
    throw new Error("Failed to send contact email");
  }
}
