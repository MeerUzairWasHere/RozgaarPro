import { AxiosError } from "axios";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  msg?: string;
  errors?: ValidationError[];
}

export function getErrorMessage(error: any): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.msg ?? "Something went wrong. Please try again."
    );
  }
  return "Something went wrong. Please try again.";
}

export function getValidationErrors(error: any): Record<string, string> {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;
    if (data?.errors && Array.isArray(data.errors)) {
      const errors: Record<string, string> = {};
      data.errors.forEach((err) => {
        errors[err.field] = err.message;
      });
      return errors;
    }
  }
  return {};
}

export function hasValidationErrors(error: any): boolean {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;
    return !!(data?.errors && Array.isArray(data.errors) && data.errors.length > 0);
  }
  return false;
}
