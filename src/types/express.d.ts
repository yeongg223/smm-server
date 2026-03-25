import { Admin } from "@prisma/index";
import "express";

declare module "express" {
  interface Request {
    admin?: Admin;
  }
}
