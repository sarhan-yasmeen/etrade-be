import { Router } from "express";
import {
  authorizePermissions,
  checkPermissions,
} from "../../middleware/authentication";

import {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updatePassword,
  updateUser,
} from "./user.controller";

export const userRouter = Router();

userRouter.get("/", authorizePermissions("admin", "owner"), getAllUsers);
userRouter.get("/:id", checkPermissions, getSingleUser);
userRouter.get("/me", getCurrentUser);

userRouter.patch("/:id", updateUser);
userRouter.patch("/:id/password", updatePassword);
