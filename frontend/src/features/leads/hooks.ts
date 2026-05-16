import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LeadFilters } from "../../types/lead";
import {
  createLead,
  deleteLead,
  exportLeads,
  getLead,
  getLeads,
  updateLead
} from "./api";

export const useLeads = (filters: LeadFilters) =>
  useQuery({
    queryKey: ["leads", filters],
    queryFn: () => getLeads(filters),
    placeholderData: (previous) => previous
  });

export const useLead = (leadId: string) =>
  useQuery({
    queryKey: ["lead", leadId],
    queryFn: () => getLead(leadId),
    enabled: Boolean(leadId)
  });

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] })
  });
};

export const useUpdateLead = (leadId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof updateLead>[1]) =>
      updateLead(leadId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
    }
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["leads"] })
  });
};

export const useExportLeads = () =>
  useMutation({
    mutationFn: exportLeads
  });