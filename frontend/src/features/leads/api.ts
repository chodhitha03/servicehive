import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import { ApiResponse } from "../../types/api";
import { Lead, LeadFilters, LeadListData } from "../../types/lead";
import { toQueryString } from "../../utils/query";

export const getLeads = async (filters: LeadFilters): Promise<LeadListData> => {
  const query = toQueryString({
    status: filters.status,
    source: filters.source,
    search: filters.search,
    sort: filters.sort,
    page: filters.page
  });

  const response = await api.get<ApiResponse<LeadListData>>(
    `${endpoints.leads.base}?${query}`
  );

  if (!response.data.data) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const getLead = async (leadId: string): Promise<Lead> => {
  const response = await api.get<ApiResponse<Lead>>(
    `${endpoints.leads.base}/${leadId}`
  );

  if (!response.data.data) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const createLead = async (payload: {
  name: string;
  email: string;
  status?: string;
  source: string;
  assignedTo?: string;
}): Promise<Lead> => {
  const response = await api.post<ApiResponse<Lead>>(
    endpoints.leads.base,
    payload
  );

  if (!response.data.data) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const updateLead = async (
  leadId: string,
  payload: {
    name?: string;
    email?: string;
    status?: string;
    source?: string;
    assignedTo?: string;
  }
): Promise<Lead> => {
  const response = await api.patch<ApiResponse<Lead>>(
    `${endpoints.leads.base}/${leadId}`,
    payload
  );

  if (!response.data.data) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const deleteLead = async (leadId: string): Promise<void> => {
  await api.delete(`${endpoints.leads.base}/${leadId}`);
};

export const exportLeads = async (filters: LeadFilters): Promise<string> => {
  const query = toQueryString({
    status: filters.status,
    source: filters.source,
    search: filters.search,
    sort: filters.sort,
    page: filters.page
  });

  const response = await api.get(`${endpoints.leads.export}?${query}`, {
    responseType: "text"
  });

  return response.data as string;
};