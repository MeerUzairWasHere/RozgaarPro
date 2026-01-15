import { AxiosError } from "axios";

export function getErrorMessage(error: any) {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.msg ?? "Something went wrong. Please try again."
    );
  }
  return "Something went wrong. Please try again.";
}
