import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { getCurrentDate } from "../utils/date";

interface IConfiguration extends Document {
  cycle: number;
  cycleHr: number;
  lastCount: Date;
  admin: string;
  password: string;
}

const configurationSchema = new Schema({
  cycle: { type: Number, required: true, default: 7 },
  cycleHr: { type: Number, required: true, default: 0 },
  lastCount: { type: Date, required: true, default: getCurrentDate() },
  admin: { type: String, required: true, default: "admin" },
  password: { type: String, required: true, default: "admin" },
});

configurationSchema.pre("save", async function (next) {
  const configuration = this as IConfiguration;
  if (!configuration.isModified("password")) {
    return next();
  }
  configuration.password = await bcrypt.hash(configuration.password, 10);
  next();
});

export const Configuration = mongoose.model<IConfiguration>(
  "Configuration",
  configurationSchema
);
