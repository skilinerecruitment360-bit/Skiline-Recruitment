import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Form submission schemas for Skiline Recruitment

// Retired Professionals Form
export const retiredProfessionalSchema = z.object({
  category: z.literal('retired'),
  name: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  email: z
    .string()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    })
    .optional()
    .or(z.literal('')),
  educationQualification: z.string().min(1, "Education qualification is required"),
  lastDesignationTitle: z.string().min(1, "Last designation is required"),
  yearsOfExperience: z.enum(['5+', '10+', '15+', '25+'], {
    errorMap: () => ({ message: "Please select years of experience" })
  }),
});

// Housewives Form (35+)
export const housewifeSchema = z.object({
  category: z.literal('housewife'),
  name: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  email: z
    .string()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    })
    .optional()
    .or(z.literal('')),
  educationQualification: z.string().min(1, "Education qualification is required"),
});

// Telecalling Form (Female, 20-25)
export const telecallingSchema = z.object({
  category: z.literal('telecalling'),
  name: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  email: z
    .string()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    })
    .optional()
    .or(z.literal('')),
  educationQualification: z.string().min(1, "Education qualification is required"),
});

// Field Executives Form (20-30)
export const fieldExecutiveSchema = z.object({
  category: z.literal('field'),
  name: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  email: z
    .string()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    })
    .optional()
    .or(z.literal('')),
  educationQualification: z.string().min(1, "Education qualification is required"),
});

// Union type for all application forms
export const applicationSchema = z.discriminatedUnion('category', [
  retiredProfessionalSchema,
  housewifeSchema,
  telecallingSchema,
  fieldExecutiveSchema,
]);

// Contact Form
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    })
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number cannot exceed 10 digits")
    .regex(/^\d+$/, "Phone number can only contain digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// TypeScript types
export type RetiredProfessionalForm = z.infer<typeof retiredProfessionalSchema>;
export type HousewifeForm = z.infer<typeof housewifeSchema>;
export type TelecallingForm = z.infer<typeof telecallingSchema>;
export type FieldExecutiveForm = z.infer<typeof fieldExecutiveSchema>;
export type ApplicationForm = z.infer<typeof applicationSchema>;
export type ContactForm = z.infer<typeof contactSchema>;

export type OpportunityCategory = 'retired' | 'housewife' | 'telecalling' | 'field';
