import {
  createuserService,
  findUser,
  findUserByEmailService,
} from "../services/userServices";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findlocationfromIP } from "../utils/location";
import { config } from "../config";

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await findUser(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await createuserService(email, password);
  res.json(user);
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmailService(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  let location;
  if (req.ip && req.ip !== "::1") {
    location = findlocationfromIP(req.ip);
  } else {
    location = "Unknown";
  }
  if (config.JWT_SECRET === undefined) {
    return res.status(500).json({ message: "JWT_SECRET is not set" });
  }
  const token = Jwt.sign({ id: user._id, location }, config.JWT_SECRET);
  res.json({ token });
};

export { getUser, createUser, loginUser };
