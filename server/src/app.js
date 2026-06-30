import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import env from "./config/env.config.js";

import routes from "./routes/index.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();

const normalizeOrigin = (origin) => {
  if (!origin || typeof origin !== "string") return origin;
  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
};

const allowedOrigins = [
  normalizeOrigin(env.CLIENT_URL),
  normalizeOrigin(process.env.CLIENT_URL_2),
  ...(process.env.CLIENT_URLS || "")
    .split(",")
    .map((url) => normalizeOrigin(url.trim()))
    .filter(Boolean),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalizedOrigin = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS origin denied: ${origin}`));
    },
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
