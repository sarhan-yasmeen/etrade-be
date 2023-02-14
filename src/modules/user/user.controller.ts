import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as CustomError from "../../errors";
import { User } from "../auth/auth.models";
import { sharedAuthSender } from "../auth/utils";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: "user" }, { password: 0, __v: 0 });
  res.status(StatusCodes.OK).json({ users });
};

export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError.BadRequestError("No user was found");
  }
  const user = await User.findById(id, { password: 0, __v: 0 });
  res.status(StatusCodes.OK).json({ user });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await User.findById(id, { password: 0, __v: 0 });
  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await User.findById(id, { password: 0, __v: 0 });
  if (!user) {
    throw new CustomError.NotFoundError("No user found!");
  }
  const { email, phone, name, role } = req.body;
  if (email) user.email = email;
  if (name) user.name = name;

  // To-Do enable if needed / on dashboard apis if any
  // if(role) user.role = role

  if (phone) user.phone = phone;

  await user.save();
  sharedAuthSender({ user, res, status: "OK" });
};

export const updatePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword) {
    throw new CustomError.BadRequestError(
      "Please Enter the old password first to continue!"
    );
  }
  if (!newPassword) {
    throw new CustomError.BadRequestError(
      "Please Enter the new password first to continue!"
    );
  }
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError.NotFoundError("No user was found");
  }
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError();
  }
  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password updated successfully" });
};
