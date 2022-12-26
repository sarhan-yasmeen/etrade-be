import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "./auth.models";
import { NotFoundError, UnAuthenticatedError } from "../../errors";

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
  const token = user?.createJWT();
  return res.status(StatusCodes.ACCEPTED).json({ user, token });
};

export const signUpController = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  return res.status(StatusCodes.CREATED).json({ user, token });
};

export const signOutController = async () => {};
