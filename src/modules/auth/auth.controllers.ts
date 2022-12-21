import { Request, Response } from "express";
import { User } from "./auth.models";
export const signInController = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body?.email });
    res.status(201).json({ ...user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized ... get out!!" });
  }
};
export const signUpController = async (req: Request, res: Response) => {
  console.log("Req", req);
  try {
    console.log("req.body", req.body);
    const user = await User.create({ ...req.body });
    res.status(201).json({ ...user, msg: "user created successfully" });
  } catch (error) {
    console.log("Err", error);
    res.status(401).json({ message: "Unauthorized ... get out!!" });
  }
};
export const signOutController = async () => {};
