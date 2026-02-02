import { Toast } from "toastify-react-native";
import { getErrorMessage } from "@/utils";

export const handleReactQueryError = (error: unknown) => {
  const message = getErrorMessage(error);
  Toast.error(message);
};
