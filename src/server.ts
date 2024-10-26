import { updateQuestionsCycle } from "./utils/updateQuestion";

const app = require("express")();
const { config } = require("./config");
const { connectDB } = require("./utils/db");
const cron = require("node-cron");

const userRoutes = require("./routes/userRoutes");

if (!config.JWT_SECRET) {
  console.error("JWT_SECRET is not set");
  process.exit(1);
}

app.use(require("express").json());

app.use("/user", userRoutes);
app.use("/question", require("./routes/questionRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

const start = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
};

start();

cron.schedule("0 * * * *", () => {
  updateQuestionsCycle()
    .then((e) => {
      console.log(`Status for update ${e}`);
    })
    .catch((error) => {
      console.log("Error updating questions", error);
    });
});
