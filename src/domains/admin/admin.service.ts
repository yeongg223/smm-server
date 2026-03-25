import { CustomError } from "src/lib/custom-error";
import { prisma } from "src/lib/prisma";
import { sign } from "jsonwebtoken";
import { env } from "src/lib/dot-env";

export class AdminService {
  async signIn(username: string, password: string) {
    const admin = await prisma.admin.findFirst({
      where: {
        username,
        password,
      },
    });

    if (!admin) {
      throw new CustomError("아이디 또는 비밀번화 존재하지 않습니다");
    }

    const token = sign(
      {
        adminId: admin.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return token;
  }
}

export const adminService = new AdminService();
