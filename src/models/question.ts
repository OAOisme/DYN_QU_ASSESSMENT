import mongoose, { Document, Schema } from "mongoose";

interface IQuestion extends Document {
  location: string;
  questions: string[];
}

const questionSchema = new Schema({
  location: { type: String, required: true },
  questions: { type: [String], required: true },
});

export const Question = mongoose.model<IQuestion>("Question", questionSchema);
