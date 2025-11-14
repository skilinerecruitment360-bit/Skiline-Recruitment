import nodemailer from "nodemailer";
import type { ApplicationForm, ContactForm } from "@shared/schema";

// Debug log environment variables
console.log('Environment Variables:', {
  EMAIL_USER: process.env.EMAIL_USER ? '***' : 'Not set',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? '***' : 'Not set',
  RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL || 'Using default'
});

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
    console.log("ℹ️  EMAIL_PASSWORD is", EMAIL_PASSWORD ? 'set' : 'not set');
    // Create a fake transporter that doesn't actually send
    transporter = {
      sendMail: async () => {
        const message = "📧 Email would be sent (no-op mode - credentials not configured)";
        console.log(message);
        return { messageId: 'no-op', message };
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

// Format confirmation email for applicant
function formatConfirmationEmail(application: ApplicationForm): string {
  return `
    <h2>Thank You for Your Application, ${application.name}!</h2>
    <hr />
    <p>We have received your application for the position. Our team will review your details and get back to you soon.</p>
    
    <h3>Application Details:</h3>
    <p><strong>Name:</strong> ${application.name}</p>
    <p><strong>Email:</strong> ${application.email}</p>
    <p><strong>Contact Number:</strong> ${application.contactNumber}</p>
    <p><strong>Education Qualification:</strong> ${application.educationQualification}</p>
    
    <hr />
    <p style="color: #666; font-size: 14px;">
      This is an automated message. Please do not reply to this email.
    </p>
  `;
}

// Send application emails (to admin and optionally to applicant if email is provided)
export async function sendApplicationEmail(application: ApplicationForm): Promise<{ success: boolean; message: string }> {
  const transport = getTransporter();
  
  if (!transport) {
    const errorMsg = 'Email transport not initialized';
    console.error('❌', errorMsg);
    return { success: false, message: errorMsg };
  }

  try {
    // Always send email to admin
    const adminEmailPromise = transport.sendMail({
      from: `"Skiline Recruitment" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Application: ${application.name}`,
      html: formatApplicationEmail(application),
    });

    // Only send confirmation email if email is provided
    const emailPromises = [adminEmailPromise];
    
    if (application.email) {
      const confirmationEmailPromise = transport.sendMail({
        from: `"Skiline Recruitment" <${EMAIL_USER}>`,
        to: application.email,
        subject: 'Application Received - Skiline Recruitment',
        html: formatConfirmationEmail(application),
      });
      emailPromises.push(confirmationEmailPromise);
    }

    // Wait for all emails to complete
    const results = await Promise.all(emailPromises);
    
    console.log('📧 Emails sent successfully:', {
      adminEmail: results[0].messageId,
      ...(application.email && { confirmationEmail: results[1]?.messageId })
    });
    
    return { 
      success: true, 
      message: `Emails sent successfully${application.email ? '' : ' (admin only)'}` 
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to send application emails:', errorMsg);
    return { success: false, message: `Failed to send emails: ${errorMsg}` };
  }
}

// Send contact form email
export async function sendContactEmail(contact: ContactForm): Promise<{ success: boolean; message: string }> {
  const transport = getTransporter();
  
  if (!transport) {
    const errorMsg = 'Email transport not initialized';
    console.error('❌', errorMsg);
    return { success: false, message: errorMsg };
  }

  try {
    const info = await transport.sendMail({
      from: `"${contact.name}" <${contact.email}>`,
      to: RECIPIENT_EMAIL,
      replyTo: contact.email,
      subject: `New Contact Form: ${contact.name}`,
      html: formatContactEmail(contact),
    });
    
    console.log('📧 Contact email sent successfully:', info.messageId);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Failed to send contact email:', errorMsg);
    return { success: false, message: `Failed to send email: ${errorMsg}` };
  }
}
