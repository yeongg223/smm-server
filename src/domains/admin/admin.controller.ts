import { Request, Response } from "express";
import { adminGuard } from "src/guards/admin.guads";
import { prisma } from "src/lib/prisma";
import { withGuard } from "src/lib/utils";
import { adminService } from "./admin.service";

export class AdminController {
  auth = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const token = await adminService.signIn(username, password);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 3,
    });
    res.sendStatus(200);
  };

  getMyInfo = withGuard(adminGuard, async (req: Request, res: Response) => {
    const { id, isRoot, path, username } = await req.admin!;

    res.json({
      id,
      isRoot,
      path,
      username,
    });
  });
}

export const adminController = new AdminController();
