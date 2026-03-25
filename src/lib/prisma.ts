import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { env } from "./dot-env";

const adapter = new PrismaMariaDb({
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
  connectionLimit: env.CONNECTION_LIMIT,
  allowPublicKeyRetrieval: true,
});

export const prisma = new PrismaClient({
  adapter,
});

export async function initializeDatabase() {
  const rootAdminPromise = prisma.admin
    .findFirst({
      where: {
        isRoot: true,
      },
    })
    .then(async (rootAdmin) => {
      if (!rootAdmin) {
        await prisma.admin.create({
          data: {
            username: env.ROOT_ADMIN_USERNAME,
            password: env.ROOT_ADMIN_PASSWORD,
            path: "/",
            isRoot: true,
          },
        });
      }
    });

  await Promise.all([rootAdminPromise]);
}
