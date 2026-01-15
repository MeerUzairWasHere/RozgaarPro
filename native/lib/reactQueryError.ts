import { Toast } from "toastify-react-native";
import { getErrorMessage } from "@/utils/error.message";

export const handleReactQueryError = (error: unknown) => {
  const message = getErrorMessage(error);
  Toast.error(message);
};
