import { Types } from "mongoose";
import { IUserDocument } from "./auth.models";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
