import { Router } from "express";

export const commonRouter = Router();

commonRouter.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.sendStatus(200);
});
