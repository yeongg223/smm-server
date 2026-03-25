import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { adminRouter } from "./domains/admin/admin.route";
import { commonRouter } from "./domains/common/common.router";
import { platformRouter } from "./domains/platform/platform.route";
import { customErrorHandler } from "./lib/custom-error";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRouter);
app.use("/common", commonRouter);
app.use("/platform", platformRouter);

app.use(customErrorHandler);

export default app;
