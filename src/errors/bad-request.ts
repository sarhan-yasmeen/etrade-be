import { CustomAPIError } from "./custom-api";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    //@ts-ignore
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
