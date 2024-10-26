import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
