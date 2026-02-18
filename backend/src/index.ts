import dotenv from "dotenv";
dotenv.config();
import "./instrument";
import * as Sentry from "@sentry/node";
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";

// Routers
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import locationRoutes from "./routes/location.routes";
import companyRoutes from "./routes/company.routes";
import skillRoutes from "./routes/skill.routes";
import professionRoutes from "./routes/profession.routes";
import freelancerRoutes from "./routes/freelancer.routes";
import jobRoutes from "./routes/job.routes";

// Middleware
import { prismaService } from "./container";

import {
  httpExceptionFilter,
  jwtExceptionFilter,
  notFoundFilter,
  prismaExceptionFilter,
  rateLimitExceptionFilter,
  zodExceptionFilter,
} from "./filters";

// const __dirname = dirname(fileURLToPath(import.meta.url)); // Uncomment if you have a frontend

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/uploads", express.static("uploads"));

app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(express.static(resolve(__dirname, "./client/dist"))); // Uncomment if you have a frontend

// Security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    handler: (req, res, next, options) => {
      // Pass a custom error object to the next middleware
      const err = new Error("Too many requests. Please try again later.");
      // Attach useful info
      (err as any).statusCode = 429;
      (err as any).retryAfter = options.windowMs / 1000 / 60 + " minutes";
      next(err);
    },
  }),
);

app.use(helmet());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/professions", professionRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/freelancers", freelancerRoutes);
app.use("/api/v1/jobs", jobRoutes);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);
app.use(notFoundFilter); // 404 errors
app.use(zodExceptionFilter); // Zod validation errors
app.use(jwtExceptionFilter); // JWT token errors
app.use(rateLimitExceptionFilter); // Rate limiting errors
app.use(prismaExceptionFilter); // Prisma database errors
app.use(httpExceptionFilter); // HTTP errors

// Port
const port = process.env.PORT || 3000;

// Start the server
const startServer = async () => {
  try {
    await prismaService.connect();
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}/...`);
    });
  } catch (error) {
    console.error(error);
    await prismaService.disconnect();
  }
};

startServer();
