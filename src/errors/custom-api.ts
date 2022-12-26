export class CustomAPIError extends Error {
  constructor(message: any) {
    console.log("message in CustomApi", message);
    super(message);
  }
}
