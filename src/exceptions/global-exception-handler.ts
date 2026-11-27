import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/internal';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  private readonly logger: Logger = new Logger(GlobalExceptionHandler.name);

  catch(exception: any, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const request: any = context.getRequest();
    const response: any = context.getResponse();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      const excResponse = exception.getResponse();

      if (typeof excResponse === 'string') {
        message = excResponse;
      } else if (
        typeof excResponse === 'object' &&
        'message' in excResponse &&
        Array.isArray(excResponse.message)
      ) {
        message = excResponse.message;
      } else {
        message = 'Bad request';
      }

      this.logger.warn(message);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      this.logger.warn(message);
    } else {
      this.logger.error(exception.stack);
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      status,
      message,
    });
  }
}
