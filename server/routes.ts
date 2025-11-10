import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendApplicationEmail, sendContactEmail } from "./email";
import { applicationSchema, contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Application submission endpoint
  app.post("/api/join-us", async (req, res) => {
    try {
      // Validate request body
      const validatedData = applicationSchema.parse(req.body);
      
      // Store the application
      const submission = await storage.createApplication(validatedData);
      
      // Send email notification
      try {
        await sendApplicationEmail(validatedData);
      } catch (emailError) {
        console.error("Email sending failed, but application was stored:", emailError);
        // Continue even if email fails - application is saved
      }
      
      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        submissionId: submission.id,
      });
    } catch (error) {
      console.error("Application submission error:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to submit application. Please try again.",
        });
      }
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact submission
      const submission = await storage.createContact(validatedData);
      
      // Send email notification
      try {
        await sendContactEmail(validatedData);
      } catch (emailError) {
        console.error("Email sending failed, but contact was stored:", emailError);
        // Continue even if email fails - message is saved
      }
      
      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        submissionId: submission.id,
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send message. Please try again.",
        });
      }
    }
  });

  // Optional: Get all submissions (for admin purposes - should be protected in production)
  app.get("/api/admin/applications", async (_req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json({ applications });
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.get("/api/admin/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ contacts });
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
