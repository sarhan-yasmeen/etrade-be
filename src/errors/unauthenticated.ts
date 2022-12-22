import { CustomAPIError } from "./custom-api";
import { StatusCodes } from "http-status-codes";

export class UnAuthenticatedError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    //@ts-ignore
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
