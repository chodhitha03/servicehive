import { Request, Response } from "express";
import { Parser } from "json2csv";
import { sendSuccess } from "../../shared/utils/response";
import * as leadsService from "./leads.service";
import { LeadFilters } from "./leads.types";

export const listLeads = async (req: Request, res: Response) => {
  const result = await leadsService.listLeads(
    req.query as unknown as LeadFilters,
    req.user!
  );
  return sendSuccess(res, 200, "Leads fetched successfully", result);
};

export const getLead = async (req: Request, res: Response) => {
  const lead = await leadsService.getLeadById(req.params.leadId, req.user!);
  return sendSuccess(res, 200, "Lead fetched successfully", lead);
};

export const createLead = async (req: Request, res: Response) => {
  const lead = await leadsService.createLead(req.body, req.user!);
  return sendSuccess(res, 201, "Lead created successfully", lead);
};

export const updateLead = async (req: Request, res: Response) => {
  const lead = await leadsService.updateLead(
    req.params.leadId,
    req.body,
    req.user!
  );
  return sendSuccess(res, 200, "Lead updated successfully", lead);
};

export const deleteLead = async (req: Request, res: Response) => {
  await leadsService.deleteLead(req.params.leadId, req.user!);
  return sendSuccess(res, 200, "Lead deleted successfully");
};

export const exportLeads = async (req: Request, res: Response) => {
  const leads = await leadsService.exportLeads(
    req.query as unknown as LeadFilters,
    req.user!
  );

  const parser = new Parser({
    fields: ["name", "email", "status", "source", "createdAt"],
    withBOM: true
  });

  const csv = parser.parse(
    leads.map((lead) => ({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt.toISOString()
    }))
  );

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
  res.status(200).send(csv);
};