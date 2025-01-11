export interface BaseResponse<T> {
  data: T | null;
  message: string;
  status: number;
}
