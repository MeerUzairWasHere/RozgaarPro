import { AxiosError } from "axios";
import * as Sentry from "@sentry/react-native";

export function getErrorMessage(error: any) {
  Sentry.captureException(error);

  if (error instanceof AxiosError) {
    return (
      error.response?.data?.msg ?? "Something went wrong. Please try again."
    );
  }
  return "Something went wrong. Please try again.";
}
