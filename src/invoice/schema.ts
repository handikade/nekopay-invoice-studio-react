import { z } from "zod";

export const invoiceItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  quantity: z.number().positive(),
  price: z.number().nonnegative(),
});

export const invoiceFromSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  email: z.email(),
});

export const invoiceToSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  email: z.email(),
});

export const invoiceFooterSchema = z.object({
  signatureURL: z.url(),
  signatureTextFooter: z.string().min(1),
  signatureTextHeader: z.string().min(1),
  terms: z.string().min(1),
  notes: z.string().min(1),
});

export const invoiceSchema = z.object({
  id: z.string(),
  currency: z.string().length(3),
  invoiceNumber: z.string().min(1),
  issueDate: z.date(),
  dueDate: z.date(),
  from: invoiceFromSchema,
  to: invoiceToSchema,
  items: z.array(invoiceItemSchema).min(1),
  footer: invoiceFooterSchema,
});

export type Invoice = z.infer<typeof invoiceSchema>;
