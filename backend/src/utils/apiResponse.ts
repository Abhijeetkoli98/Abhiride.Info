import { Response } from 'express';

export interface ApiResponsePayload<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: any;
  timestamp: string;
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200, meta?: any) {
  const payload: ApiResponsePayload<T> = {
    success: true,
    data,
    meta,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(payload);
}

export function sendError(res: Response, errorMessage: string, statusCode = 400) {
  const payload: ApiResponsePayload = {
    success: false,
    error: errorMessage,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(payload);
}
