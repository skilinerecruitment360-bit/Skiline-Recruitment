import { randomUUID } from "crypto";
import type { ApplicationForm, ContactForm } from "@shared/schema";

// Storage interface for Skiline Recruitment
export interface IStorage {
  // Application submissions
  createApplication(application: ApplicationForm): Promise<ApplicationSubmission>;
  getApplications(): Promise<ApplicationSubmission[]>;
  
  // Contact form submissions
  createContact(contact: ContactForm): Promise<ContactSubmission>;
  getContacts(): Promise<ContactSubmission[]>;
}

export interface ApplicationSubmission extends ApplicationForm {
  id: string;
  submittedAt: Date;
}

export interface ContactSubmission extends ContactForm {
  id: string;
  submittedAt: Date;
}

export class MemStorage implements IStorage {
  private applications: Map<string, ApplicationSubmission>;
  private contacts: Map<string, ContactSubmission>;

  constructor() {
    this.applications = new Map();
    this.contacts = new Map();
  }

  async createApplication(application: ApplicationForm): Promise<ApplicationSubmission> {
    const id = randomUUID();
    const submission: ApplicationSubmission = {
      ...application,
      id,
      submittedAt: new Date(),
    };
    this.applications.set(id, submission);
    return submission;
  }

  async getApplications(): Promise<ApplicationSubmission[]> {
    return Array.from(this.applications.values());
  }

  async createContact(contact: ContactForm): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...contact,
      id,
      submittedAt: new Date(),
    };
    this.contacts.set(id, submission);
    return submission;
  }

  async getContacts(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
