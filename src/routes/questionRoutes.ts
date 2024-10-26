import { addQuestion, getQuestion } from "../controllers/questionController";
import { authAdmin, authUser } from "../middleware/auth";

const Router = require("express").Router();

Router.route("/").post(authAdmin, addQuestion).get(authUser, getQuestion);

module.exports = Router;
