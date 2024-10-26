import { Request, Response } from "express";
import {
  getConfiguration,
  updateAdminService,
  updateConfigurationCycle,
} from "../services/configurationServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";

const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const configuration = await getConfiguration();

  if (email !== configuration?.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, configuration!.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (config.JWT_SECRET === undefined) {
    return res.status(500).json({ message: "Configuration not found" });
  }

  const token = jwt.sign({ role: "admin" }, config.JWT_SECRET);
  res.json({ token });
};

const updateAdmin = async (req: Request, res: Response) => {
  const { admin, password } = req.body;

  updateAdminService({ admin, password })
    .then(() => {
      res.json({ message: "Admin updated" });
    })
    .catch(() => {
      res.status(500).json({ message: "Error updating admin" });
    });
};

const updateConfiguration = async (req: Request, res: Response) => {
  const { cycle, cycleHr } = req.body;

  if (!cycle) {
    return res.status(400).json({ message: "Invalid input" });
  }

  updateConfigurationCycle({ cycle, cycleHr })
    .then(() => {
      res.json({ message: "Configuration updated" });
    })
    .catch(() => {
      res.status(500).json({ message: "Error updating configuration" });
    });
};

const getConfigInfo = async (req: Request, res: Response) => {
  const configuration = await getConfiguration();

  res.json({
    Cycle: configuration?.cycle,
    CycleHours: configuration?.cycleHr,
  });
};

export { loginAdmin, updateConfiguration, getConfigInfo, updateAdmin };
