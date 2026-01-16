import * as SecureStore from "expo-secure-store";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  RegisterInputDto,
  LoginInputDto,
  AuthResponse,
  RequestOtpInputDto,
  VerifyOtpInputDto,
  SIGN_UP_STEP,
} from "@/types";
import { authApi } from "@/api/authApi";
import { Toast } from "toastify-react-native";
import { getErrorMessage } from "@/utils/error.message";
import { useAuthStore, useOnboardingStore } from "@/store";
import { router } from "expo-router";
import { ROUTES } from "@/constants";

export const useRegister = (): UseMutationResult<
  string,
  Error,
  RegisterInputDto
> => {
  const queryClient = useQueryClient();
  const { setSignupStep } = useAuthStore();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.clear();
      setSignupStep(SIGN_UP_STEP.OTP);
      router.replace(ROUTES.OTP_VERIFICATION);
    },
    onError: (error) => {
      Toast.error(getErrorMessage(error));
    },
  });
};

export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginInputDto
> => {
  const queryClient = useQueryClient();
  const { setUser, setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      setUser(data.tokenUser);
      setAuthenticated(true);

      queryClient.clear();
      router.replace(ROUTES.HOME);
    },
    onError: (error) => {
      Toast.error(getErrorMessage(error));
    },
  });
};

export const useLogout = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();

  const { setUser, setAuthenticated, clearAuth } = useAuthStore();
  const { completeOnboarding } = useOnboardingStore();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      queryClient.clear();
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      setUser(null);
      setAuthenticated(false);
      // clearAuth(); //TODO: add this later
      completeOnboarding(false); //TODO: remove this later
      router.replace(ROUTES.SELECT_ROLE);
    },
  });
};

export const useRequestOTP = (): UseMutationResult<
  string,
  Error,
  RequestOtpInputDto
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.requestOtp,
    onSuccess: async (data) => {
      queryClient.clear();
    },
    onError: (error) => {
      Toast.error(getErrorMessage(error));
    },
  });
};

export const useVerityOTP = (): UseMutationResult<
  string,
  Error,
  VerifyOtpInputDto
> => {
  const queryClient = useQueryClient();
  const { setSignupStep } = useAuthStore();

  return useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: async (data) => {
      queryClient.clear();
      setSignupStep(SIGN_UP_STEP.DONE);
      router.replace(ROUTES.SIGN_IN);
      Toast.success("OTP verified");
    },
    onError: (error) => {
      Toast.error(getErrorMessage(error));
    },
  });
};
