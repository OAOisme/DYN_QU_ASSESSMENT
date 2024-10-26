//@ts-nocheck
import {
  getConfiguration,
  updateConfigurationLastCount,
} from "../services/configurationServices";
import {
  getAllCQuestionsService,
  getAllQuestionsService,
  getQuestionsService,
} from "../services/questionServices";
import { getCurrentDate } from "./date";

const checkIfTimehasPassed = async () => {
  const configuration = await getConfiguration();
  let lastCount = new Date(configuration?.lastCount);
  lastCount.setHours(lastCount.getHours() + configuration.cycleHr);
  const cycle = configuration.cycle;
  const currentDate = new Date();
  const daysDifference = Math.floor(
    (currentDate.getTime() - lastCount.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysDifference >= cycle) {
    return true;
  }
  return false;
};

const updateLastCount = async () => {
  const configuration = await getConfiguration();
  const lastCount = new Date(getCurrentDate());
  await updateConfigurationLastCount(lastCount);
};

const updateQuestions = async () => {
  const currentQuestions = await getAllCQuestionsService();

  for (let item of currentQuestions) {
    const location = item.location;
    const questions = (await getQuestionsService(location))?.questions;
    item.questionIndex++;
    if (item.questionIndex >= questions.length) {
      item.questionIndex = 0;
    }
    item.question = questions[item.questionIndex];
    await item.save();
  }
};

export const updateQuestionsCycle = async () => {
  if (await checkIfTimehasPassed()) {
    await updateQuestions();
    await updateLastCount();
    return "Done";
  } else {
    return "Not Ready";
  }
};
