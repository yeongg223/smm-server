import { NextFunction, Request, Response } from "express";

export function withGuard(
  guard: (req: Request, res: Response, next: NextFunction) => void,
  handler: (req: Request, res: Response, next: NextFunction) => void,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    guard(req, res, (err?: any) => {
      if (err) return next(err);

      Promise.resolve(handler(req, res, next)).catch(next);
    });
  };
}
