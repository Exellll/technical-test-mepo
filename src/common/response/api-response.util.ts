import { ApiResponse } from './api-response.interface';

export class ApiResponseBuilder {
  static success<T>(
    data: T,
    description = 'Success',
    meta?: Record<string, any>,
  ): ApiResponse<T> {
    return {
      status: 'success',
      description,
      data,
      meta,
    };
  }
}
