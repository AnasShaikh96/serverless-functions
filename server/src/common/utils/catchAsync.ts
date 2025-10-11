import type { Response, Request, NextFunction, Errback } from "express";

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Errback) => next(err));
  };
};
