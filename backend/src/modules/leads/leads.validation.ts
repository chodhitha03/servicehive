import { z } from "zod";
import { LeadSource, LeadStatus } from "./leads.types";

const leadIdParam = z.object({
  params: z.object({
    leadId: z.string().min(1, "Lead id required")
  })
});

export const listLeadsSchema = z.object({
  query: z.object({
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
    search: z.string().min(1).optional(),
    sort: z.enum(["latest", "oldest"]).optional(),
    page: z.coerce.number().int().positive().optional()
  })
});

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Valid email required"),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource),
    assignedTo: z.string().optional()
  })
});

export const updateLeadSchema = z.object({
  params: leadIdParam.shape.params,
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    status: z.nativeEnum(LeadStatus).optional(),
    source: z.nativeEnum(LeadSource).optional(),
    assignedTo: z.string().optional()
  })
});

export const leadIdSchema = leadIdParam;