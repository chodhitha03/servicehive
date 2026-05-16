import { Router } from "express";
import { asyncHandler } from "../../shared/utils/async-handler";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import * as leadsController from "./leads.controller";
import {
  createLeadSchema,
  leadIdSchema,
  listLeadsSchema,
  updateLeadSchema
} from "./leads.validation";

export const leadRoutes = Router();

leadRoutes.use(authMiddleware);

leadRoutes.get(
  "/",
  validate(listLeadsSchema),
  asyncHandler(leadsController.listLeads)
);

leadRoutes.get(
  "/export",
  validate(listLeadsSchema),
  asyncHandler(leadsController.exportLeads)
);

leadRoutes.post(
  "/",
  validate(createLeadSchema),
  asyncHandler(leadsController.createLead)
);

leadRoutes.get(
  "/:leadId",
  validate(leadIdSchema),
  asyncHandler(leadsController.getLead)
);

leadRoutes.patch(
  "/:leadId",
  validate(updateLeadSchema),
  asyncHandler(leadsController.updateLead)
);

leadRoutes.delete(
  "/:leadId",
  validate(leadIdSchema),
  asyncHandler(leadsController.deleteLead)
);