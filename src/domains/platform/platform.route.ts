import { Router } from "express";
import multer from "multer";
import { platfomController } from "./platform.controller";

const upload = multer({ storage: multer.memoryStorage() });

export const platformRouter = Router();

platformRouter.patch(
  "/image",
  upload.single("file"),
  platfomController.updateFavicon,
);

platformRouter.get("/my", platfomController.getMyPlatform);
