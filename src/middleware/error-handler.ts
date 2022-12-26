import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, Please Try Again",
  };
  if (err.name === "ValidationError") {
    console.log("shit is going on here", err);
    customErr.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customErr.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customErr.msg = `Duplicate  Values entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customErr.statusCode = 400;
  }
  if (err.name === "Cast Error") {
    customErr.msg = `No item was found with id: ${err.value}`;
    customErr.statusCode = 404;
  }

  return res.status(customErr.statusCode).json({ msg: customErr.msg });
};
