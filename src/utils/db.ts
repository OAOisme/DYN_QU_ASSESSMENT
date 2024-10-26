import mongoose from "mongoose";
import { config } from "../config";
import { Configuration } from "../models/configuration";
import { getCurrentDate } from "./date";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    const configuration = await Configuration.findOne();
    if (!configuration) {
      const c = new Configuration({
        cycle: 7,
        lastCount: getCurrentDate(),
        password: "admin",
      });
      await c.save();
    }

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
