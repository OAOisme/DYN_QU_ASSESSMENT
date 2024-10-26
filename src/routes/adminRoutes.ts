import {
  getConfigInfo,
  loginAdmin,
  updateAdmin,
  updateConfiguration,
} from "../controllers/configurationController";
import { authAdmin } from "../middleware/auth";

const Router = require("express").Router();

Router.route("/login").post(loginAdmin);

Router.route("/updateconfig").post(authAdmin, updateConfiguration);

Router.route("/").get(authAdmin, getConfigInfo);

Router.route("/updateadmin").post(authAdmin, updateAdmin);

module.exports = Router;
