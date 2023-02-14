import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "./auth.models";
import { NotFoundError, UnAuthenticatedError } from "../../errors";
import { attachCookiesToToken, sharedAuthSender } from "./utils";

// register controller
export const signUpController = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  sharedAuthSender({ user, res, status: "CREATED" });
};

// login controller
export const signInController = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body?.email });
  if (!user) {
    throw new NotFoundError("No user was found");
  }
  const isCorrectPassword = await user?.comparePassword(req.body.password);
  if (!isCorrectPassword) {
    throw new UnAuthenticatedError();
  }
  sharedAuthSender({ user, res, status: "ACCEPTED" });
};

// logout controller
export const signOutController = async (req: Request, res: Response) => {
  res.cookie("access_token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production" ? true : false,
    signed: true,
  });
  res.status(200).json({});
};
