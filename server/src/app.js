import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import env from "./config/env.config.js";

import routes from "./routes/index.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 CodeRoom Backend Running",
  });
});
app.use("/api", routes);

app.use(errorHandler);

export default app;
