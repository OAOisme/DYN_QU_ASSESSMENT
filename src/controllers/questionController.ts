import { Request, Response } from "express";
import {
  createQuestionService,
  getAvailableQuestionService,
} from "../services/questionServices";

const addQuestion = async (req: Request, res: Response) => {
  const { question, location } = req.body;
  if (!question || !location) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    const newQuestion = await createQuestionService(location, question);
    res.json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error adding question" });
  }
};

const getQuestion = async (req: Request, res: Response) => {
  // @ts-ignore
  const location = req.location;

  const questions = await getAvailableQuestionService(location);
  if (!questions) {
    return res
      .status(404)
      .json({ message: "No question found for your region" });
  }

  res.json(questions);
};

export { addQuestion, getQuestion };
