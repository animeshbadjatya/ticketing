import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
    statusCode: number = 404;
    constructor() {
        super('Page Not Found');
    
     // Only because we are extending a built-in Error class
    Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Page Not Found'}];
    }
}