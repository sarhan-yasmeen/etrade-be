import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import * as CustomError from "../errors";
import { createUserToken, isTokenValid } from "../modules/auth/utils";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.signedCookies;
  console.log("token", access_token);
  if (!access_token) {
    throw new CustomError.UnAuthenticatedError();
  }
  try {
    const payload = isTokenValid({ token: access_token });
    req.user = createUserToken({ user: payload });
  } catch (error) {
    throw new CustomError.UnAuthenticatedError();
  }
  next();
};

export const authorizePermissions = (...roles: string[]) => {
  console.log("will fire");
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    console.log("roles", role, roles);
    if (!roles.includes(role)) {
      throw new CustomError.UnAuthorizedError(
        "You don't have enough permissions to perform this action!"
      );
    }
    next();
  };
};

export const checkPermissions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role, id: authId } = req.user;
  const { id } = req.params;
  console.log("role", role, id, authId);

  if (role !== "admin" && id !== authId) {
    throw new CustomError.UnAuthorizedError(
      "Something went wrong ... You don't have enough access to view this resource or you are in the wrong place!"
    );
  }
  next();
};
