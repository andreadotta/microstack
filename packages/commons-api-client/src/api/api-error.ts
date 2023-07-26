export class ApiError extends Error {
  statusCode: number;
  errorMessage: string;

  constructor(message: string, statusCode: number, errorMessage: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.name = 'ApiError';
  }
}