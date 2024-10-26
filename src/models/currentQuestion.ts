import mongoose, { Document, Schema } from "mongoose";

interface ICurrentQuestion extends Document {
  location: string;
  questionIndex: number;
  question: string;
}

const currentQuestionSchema = new Schema({
  location: { type: String, required: true },
  questionIndex: { type: Number, required: true },
  question: { type: String, required: true },
});

export const CurrentQuestion = mongoose.model<ICurrentQuestion>(
  "CurrentQuestion",
  currentQuestionSchema
);
