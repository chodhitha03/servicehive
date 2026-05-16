import { AuthUser } from "./auth";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";
export type LeadSort = "latest" | "oldest";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: AuthUser;
  createdAt: string;
}

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: LeadSort;
  page?: number;
}

export interface LeadListMeta {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LeadListData {
  leads: Lead[];
  meta: LeadListMeta;
}