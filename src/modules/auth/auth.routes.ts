import { Router } from "express";
import {
  signInController,
  signUpController,
  signOutController,
} from "./auth.controllers";

export const authRouter = Router();

authRouter.post("/signin", signInController);
authRouter.post("/signup", signUpController);
authRouter.post("/signout", signOutController);
