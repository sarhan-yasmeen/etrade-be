import jwt from "jsonwebtoken";
import { JWT_LIFE_TIME, JWT_SECRET, NODE_ENV } from "../../utils/config";
import { Response } from "express";
import { User } from "./types";
import { StatusCodes } from "http-status-codes";

export const createJWT = (user: User) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: JWT_LIFE_TIME,
    }
  );
};

export const isTokenValid = ({ token }: { token: string }) => {
  return jwt.verify(token, JWT_SECRET);
};

export const createUserToken = ({ user }: { user: any }) => {
  return {
    email: user.email,
    name: user.name,
    role: user.role,
    id: user._id ?? user.id,
  };
};

export const attachCookiesToToken = ({
  res,
  user,
}: {
  res: Response;
  user: User;
}) => {
  const token = createJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;

  console.log("time", new Date(Date.now() + oneDay));
  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: NODE_ENV === "production" ? true : false,
    signed: true,
  });
};

export const sharedAuthSender = ({
  user,
  res,
  status = "OK" as const,
}: {
  user: any;
  res: Response;
  status: typeof StatusCodes[number];
}) => {
  const tokenUser = createUserToken({ user });
  attachCookiesToToken({ res, user: tokenUser });
  // @ts-ignore
  return res.status(StatusCodes[status as const]).json({ ...tokenUser });
};
