import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lead } from "../../types/lead";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { useCreateLead, useUpdateLead } from "../../features/leads/hooks";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]) 
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  lead?: Lead | null;
}

export const LeadFormModal = ({ open, onClose, lead }: LeadFormModalProps) => {
  const isEditing = Boolean(lead);
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead(lead?._id ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: lead?.name ?? "",
      email: lead?.email ?? "",
      status: lead?.status ?? "New",
      source: lead?.source ?? "Website"
    }
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source
      });
    } else {
      reset({
        name: "",
        email: "",
        status: "New",
        source: "Website"
      });
    }
  }, [lead, reset]);

  const onSubmit = async (values: LeadFormValues) => {
    if (isEditing && lead) {
      await updateMutation.mutateAsync(values);
    } else {
      await createMutation.mutateAsync(values);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Update Lead" : "Create Lead"}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="lead-form" disabled={isSubmitting}>
            {isEditing ? "Save" : "Create"}
          </Button>
        </div>
      }
    >
      <form id="lead-form" className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Full name" error={errors.name?.message} {...register("name")} />
        <Input label="Email" error={errors.email?.message} {...register("email")} />
        <Select label="Status" {...register("status")}> 
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </Select>
        <Select label="Source" error={errors.source?.message} {...register("source")}>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </Select>
      </form>
    </Modal>
  );
};