import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  errors: ValidationError[] = [];
  constructor(errors: ValidationError[]) {
    super('Error validating request'); // this msgs for logging only
    this.errors = errors;

    // Only because we are extending a built-in Error class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}

// We use this function to create a new instance of RequestValidationError and throw it to error handler.
//throw new RequestValidationError(errors);
