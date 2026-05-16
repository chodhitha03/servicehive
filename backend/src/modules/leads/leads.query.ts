import { FilterQuery } from "mongoose";
import { LeadDocument } from "../../models/Lead.model";
import { UserRole } from "../../shared/constants/roles";
import { escapeRegex } from "../../shared/utils/regex";
import { JwtPayload } from "../auth/auth.types";
import { LeadFilters } from "./leads.types";

export const buildAccessFilter = (user: JwtPayload): FilterQuery<LeadDocument> => {
  if (user.role === UserRole.Admin) {
    return {};
  }

  return {
    $or: [{ assignedTo: user.userId }, { createdBy: user.userId }]
  };
};

export const buildLeadFilter = (
  filters: LeadFilters
): FilterQuery<LeadDocument> => {
  const query: FilterQuery<LeadDocument> = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.source) {
    query.source = filters.source;
  }

  if (filters.search) {
    const pattern = new RegExp(escapeRegex(filters.search), "i");
    query.$or = [{ name: pattern }, { email: pattern }];
  }

  return query;
};

export const buildLeadSort = (sort?: string) => {
  if (sort === "oldest") {
    return { createdAt: 1 };
  }

  return { createdAt: -1 };
};