import mongoose, { Document, Model, Schema } from "mongoose";
import { UserRole } from "../shared/constants/roles";

export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  refreshTokenHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Sales
    },
    refreshTokenHash: { type: String }
  },
  { timestamps: true }
);

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);