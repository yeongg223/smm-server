import { Router } from "express";
import { adminController } from "./admin.controller";

export const adminRouter = Router();

adminRouter.get("/my", adminController.getMyInfo);
adminRouter.post("/sign-in", adminController.auth);
