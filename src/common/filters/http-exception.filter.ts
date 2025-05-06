import { Response } from "express";

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { ErrorResponse } from "../interfaces/error-response.interface";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse: ErrorResponse = {
      status,
      message:
        typeof exceptionResponse === "string"
          ? exceptionResponse
          : (exceptionResponse as any).message || "Internal server error",
      errors: (exceptionResponse as any).errors || undefined,
    };

    response.status(status).json(errorResponse);
  }
}
