import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "src/lib/dot-env";
import { prisma } from "src/lib/prisma";

export const adminGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["token"];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const data = verify(token, env.JWT_SECRET) as any;
    const admin = await prisma.admin.findUnique({
      where: {
        id: data.adminId,
      },
    });

    if (!admin) {
      res.sendStatus(401);
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
