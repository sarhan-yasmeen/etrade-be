import jwt from "jsonwebtoken";
import { JWT_LIFE_TIME, JWT_SECRET, NODE_ENV } from "../../utils/config";
import { Response } from "express";
import { User } from "./types";

export const createJWT = (user: User) => {
  return jwt.sign({ userId: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: JWT_LIFE_TIME,
  });
};

export const isTokenValid = ({ token }: { token: string }) => {
  return jwt.verify(token, JWT_SECRET);
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

  res.cookie("access_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: NODE_ENV === "production" ? true : false,
    signed: true,
  });
};
