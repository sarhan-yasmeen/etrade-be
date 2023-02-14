import { CustomAPIError } from "./custom-api";
import { StatusCodes } from "http-status-codes";

export class UnAuthorizedError extends CustomAPIError {
  constructor(message?: any) {
    // console.log("message in compare", message);
    super(message);
    this.message = message || "UnAuthorized ... please try again";
    //@ts-ignore
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
