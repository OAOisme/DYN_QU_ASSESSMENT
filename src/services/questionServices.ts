import { Question } from "../models/question";
import { CurrentQuestion } from "../models/currentQuestion";

const createCurrentQuestionService = async (
  location: string,
  questionIndex: number,
  question: string
) => {
  const currentQuestion = await CurrentQuestion.findOne({ location });
  if (currentQuestion) {
    return await CurrentQuestion.findOneAndUpdate(
      { location },
      { questionIndex, question }
    );
  }
  const newCurrentQuestion = new CurrentQuestion({
    location,
    questionIndex,
    question,
  });
  return newCurrentQuestion.save();
};

const createQuestionService = async (location: string, question: string) => {
  const locationExists = await Question.findOne({ location });
  if (locationExists) {
    locationExists.questions.push(question);
    return locationExists.save();
  }
  const newQuestion = new Question({ location, questions: [question] });
  createCurrentQuestionService(location, 0, question);
  return newQuestion.save();
};

const getQuestionsService = async (location: string) => {
  return await Question.findOne({ location });
};

const getAvailableQuestionService = async (location: string) => {
  return await CurrentQuestion.find({ location });
};

const getAllCQuestionsService = async () => {
  return await CurrentQuestion.find();
};

const getAllQuestionsService = async () => {
  return await Question.find();
};

export {
  createQuestionService,
  getQuestionsService,
  getAvailableQuestionService,
  getAllCQuestionsService,
  getAllQuestionsService,
};
