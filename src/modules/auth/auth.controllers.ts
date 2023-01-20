import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "./auth.models";
import { NotFoundError, UnAuthenticatedError } from "../../errors";
import { attachCookiesToToken } from "./utils";

// register controller
export const signUpController = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  // const token = user.createJWT();
  const tokenUser = {
    email: user.email,
    name: user.name,
    role: user.role,
    id: user._id,
  };
  attachCookiesToToken({ res, user: tokenUser });
  return res.status(StatusCodes.CREATED).json({ tokenUser });
};

// login controller
export const signInController = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body?.email });
  if (!user) {
    throw new NotFoundError("No user was found");
  }
  const isCorrectPassword = await user?.comparePassword(req.body.password);
  console.log("isCorrectPassword", isCorrectPassword);
  if (!isCorrectPassword) {
    throw new UnAuthenticatedError();
  }
  const tokenUser = {
    email: user.email,
    name: user.name,
    role: user.role,
    id: user._id,
  };
  attachCookiesToToken({ res, user: tokenUser });
  return res.status(StatusCodes.ACCEPTED).json({ tokenUser });
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
