import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import {
  getValidationErrors,
  getErrorMessage,
  hasValidationErrors,
} from "@/utils/error.message";
import { UseMutationResult } from "@tanstack/react-query";

interface UseFormErrorsReturn {
  errors: Record<string, string>;
  generalError: string;
  clearErrors: () => void;
  clearFieldError: (field: string) => void;
  setFieldError: (field: string, message: string) => void;
}

/**
 * Custom hook to handle form errors from React Query mutations
 * Automatically extracts validation errors and general errors from mutation errors
 *
 * @param mutation - React Query mutation result
 * @returns Object containing errors state and helper functions
 *
 * @example
 * ```tsx
 * const loginMutation = useLogin();
 * const { errors, generalError, clearFieldError } = useFormErrors(loginMutation);
 *
 * <CustomInput
 *   error={errors.email}
 *   onChangeText={(text) => {
 *     setField("email", text);
 *     clearFieldError("email");
 *   }}
 * />
 * ```
 */
export function useFormErrors<TData, TError, TVariables>(
  mutation: UseMutationResult<TData, TError, TVariables>,
): UseFormErrorsReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");

  useEffect(() => {
    if (mutation.isError) {
      const error = mutation.error as AxiosError;
      if (hasValidationErrors(error)) {
        setErrors(getValidationErrors(error));
        setGeneralError("");
      } else {
        setGeneralError(getErrorMessage(error));
        setErrors({});
      }
    } else {
      setErrors({});
      setGeneralError("");
    }
  }, [mutation.isError, mutation.error]);

  const clearErrors = () => {
    setErrors({});
    setGeneralError("");
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setFieldError = (field: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  return {
    errors,
    generalError,
    clearErrors,
    clearFieldError,
    setFieldError,
  };
}
