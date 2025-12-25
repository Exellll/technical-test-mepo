import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ApiResponseBuilder } from '../response/api-response.util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (data?.status && data?.description) {
          return data;
        }

        return ApiResponseBuilder.success(data);
      }),
    );
  }
}
