import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { config } from "../config";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (config.JWT_SECRET === undefined) {
    return res.status(500).json({ message: "JWT_SECRET is not set" });
  }

  try {
    const decoded = Jwt.verify(token, config.JWT_SECRET);
    // @ts-ignore
    req.location = decoded.location;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (config.JWT_SECRET === undefined) {
    return res.status(500).json({ message: "JWT_SECRET is not set" });
  }

  try {
    const decoded = Jwt.verify(token, config.JWT_SECRET);
    // @ts-ignore
    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
