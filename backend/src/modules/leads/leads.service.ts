import { LeadModel } from "../../models/Lead.model";
import { ApiError } from "../../middleware/error.middleware";
import {
  buildPageMeta,
  DEFAULT_PAGE_SIZE,
  getPagination
} from "../../shared/utils/pagination";
import { JwtPayload } from "../auth/auth.types";
import { UserRole } from "../../shared/constants/roles";
import { buildAccessFilter, buildLeadFilter, buildLeadSort } from "./leads.query";
import { LeadCreateInput, LeadFilters, LeadUpdateInput } from "./leads.types";

const assertAssignable = (user: JwtPayload, assignedTo?: string) => {
  if (user.role === UserRole.Sales && assignedTo && assignedTo !== user.userId) {
    throw new ApiError(403, "Sales users can only assign leads to themselves");
  }
};

export const createLead = async (input: LeadCreateInput, user: JwtPayload) => {
  assertAssignable(user, input.assignedTo);

  const lead = await LeadModel.create({
    name: input.name,
    email: input.email,
    status: input.status,
    source: input.source,
    assignedTo: input.assignedTo ?? user.userId,
    createdBy: user.userId
  });

  return lead;
};

export const updateLead = async (
  leadId: string,
  input: LeadUpdateInput,
  user: JwtPayload
) => {
  assertAssignable(user, input.assignedTo);
  const accessFilter = buildAccessFilter(user);

  const lead = await LeadModel.findOneAndUpdate(
    { _id: leadId, ...accessFilter },
    {
      $set: {
        ...input,
        assignedTo: input.assignedTo ?? undefined
      }
    },
    { new: true }
  );

  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }

  return lead;
};

export const deleteLead = async (leadId: string, user: JwtPayload) => {
  const accessFilter = buildAccessFilter(user);

  const lead = await LeadModel.findOneAndDelete({ _id: leadId, ...accessFilter });

  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }
};

export const getLeadById = async (leadId: string, user: JwtPayload) => {
  const accessFilter = buildAccessFilter(user);
  const lead = await LeadModel.findOne({ _id: leadId, ...accessFilter })
    .populate("assignedTo", "name email role")
    .populate("createdBy", "name email role");

  if (!lead) {
    throw new ApiError(404, "Lead not found");
  }

  return lead;
};

export const listLeads = async (filters: LeadFilters, user: JwtPayload) => {
  const { skip, limit, currentPage } = getPagination(filters.page ?? 1);
  const accessFilter = buildAccessFilter(user);
  const leadFilter = buildLeadFilter(filters);
  const filter = { $and: [accessFilter, leadFilter] };
  const sort = buildLeadSort(filters.sort);

  const [totalRecords, leads] = await Promise.all([
    LeadModel.countDocuments(filter),
    LeadModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("assignedTo", "name email role")
  ]);

  const meta = buildPageMeta(totalRecords, currentPage, DEFAULT_PAGE_SIZE);

  return { leads, meta };
};

export const exportLeads = async (filters: LeadFilters, user: JwtPayload) => {
  const accessFilter = buildAccessFilter(user);
  const leadFilter = buildLeadFilter(filters);
  const filter = { $and: [accessFilter, leadFilter] };
  const sort = buildLeadSort(filters.sort);

  return LeadModel.find(filter).sort(sort).populate("assignedTo", "name email");
};