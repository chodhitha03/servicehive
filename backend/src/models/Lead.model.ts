import mongoose, { Document, Model, Schema } from "mongoose";
import { LeadSource, LeadStatus } from "../modules/leads/leads.types";

export interface LeadDocument extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.New
    },
    source: {
      type: String,
      enum: Object.values(LeadSource),
      required: true
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

leadSchema.index({ name: "text", email: "text" });
leadSchema.index({ status: 1, source: 1, createdAt: -1 });

export const LeadModel: Model<LeadDocument> = mongoose.model<LeadDocument>(
  "Lead",
  leadSchema
);