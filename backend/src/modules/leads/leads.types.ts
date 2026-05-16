export enum LeadStatus {
  New = "New",
  Contacted = "Contacted",
  Qualified = "Qualified",
  Lost = "Lost"
}

export enum LeadSource {
  Website = "Website",
  Instagram = "Instagram",
  Referral = "Referral"
}

export type LeadSort = "latest" | "oldest";

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: LeadSort;
  page?: number;
}

export interface LeadCreateInput {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
  assignedTo?: string;
}

export interface LeadUpdateInput {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
  assignedTo?: string;
}

export interface LeadListMeta {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}