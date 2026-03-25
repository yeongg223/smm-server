import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { CustomError } from "src/lib/custom-error";
import { env } from "src/lib/dot-env";
import { prisma } from "src/lib/prisma";

export const platformModifyGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { siteId } = req.body;
  const token = req.cookies["token"];

  if (!siteId) {
    res.sendStatus(400);
    return;
  }

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

    const site = await prisma.site.findFirst({
      where: {
        id: Number(siteId),
        admin: {
          path: {
            startsWith: admin.path,
          },
        },
      },
    });

    if (!site) {
      throw new CustomError("권한이 없습니다", 403);
    }

    next();
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.sendStatus(401);
  }
};
