import { CustomAPIError } from "./custom-api";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    //@ts-ignore
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
