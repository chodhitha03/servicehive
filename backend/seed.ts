import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "./src/models/User.model";
import { LeadModel } from "./src/models/Lead.model";
import { UserRole } from "./src/shared/constants/roles";
import { env } from "./src/config/env";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Create Admin User
    const adminEmail = "maripellichodhitha@gmail.com";
    let admin = await UserModel.findOne({ email: adminEmail });
    
    if (!admin) {
      const passwordHash = await bcrypt.hash("AdminPassword123!", 12);
      admin = await UserModel.create({
        name: "Admin User",
        email: adminEmail,
        passwordHash,
        role: UserRole.Admin
      });
      console.log(`Created admin user: ${adminEmail}`);
    } else {
      console.log(`Admin user ${adminEmail} already exists.`);
      // Update role just in case
      admin.role = UserRole.Admin;
      await admin.save();
    }

    // Create some leads if there are none
    const leadCount = await LeadModel.countDocuments();
    if (leadCount === 0) {
      const dummyLeads = [
        {
          name: "Acme Corp",
          email: "contact@acmecorp.com",
          status: "New",
          source: "Website",
          assignedTo: admin._id,
          createdBy: admin._id
        },
        {
          name: "Stark Industries",
          email: "tony@stark.com",
          status: "Contacted",
          source: "Referral",
          assignedTo: admin._id,
          createdBy: admin._id
        },
        {
          name: "Wayne Enterprises",
          email: "bruce@wayne.com",
          status: "Qualified",
          source: "Website",
          assignedTo: admin._id,
          createdBy: admin._id
        },
        {
          name: "Oscorp",
          email: "norman@oscorp.com",
          status: "Lost",
          source: "Instagram",
          assignedTo: admin._id,
          createdBy: admin._id
        }
      ];

      await LeadModel.insertMany(dummyLeads);
      console.log("Seeded database with dummy leads.");
    } else {
      console.log("Database already contains leads.");
    }

    console.log("Seeding complete.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
