export interface ResponseFailure {
  error: ResponseError;
}

export type SupaResponse<T> = T | ResponseFailure;

export interface ResponseError {
  code?: number | string;
  message: string;
  requestId?: string;
}
export interface Dictionary<T> {
  [Key: string]: T;
}
