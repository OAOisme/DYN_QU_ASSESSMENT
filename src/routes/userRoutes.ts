import { loginUser } from "../controllers/userController";
import { authAdmin } from "../middleware/auth";

const Router = require("express").Router();

const { getUser, createUser } = require("../controllers/userController");

Router.route("/:id").get(authAdmin, getUser);

Router.route("/").post(createUser);

Router.route("/login").post(loginUser);

module.exports = Router;
