export interface ApiResponse<T> {
  status: 'success' | 'error';
  description: string;
  data: T;
  meta?: Record<string, any>;
}