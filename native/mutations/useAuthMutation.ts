import * as SecureStore from "expo-secure-store";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import {
  RegisterInputDto,
  LoginInputDto,
  AuthResponse,
  RequestOtpInputDto,
  VerifyOtpInputDto,
  SIGN_UP_STEP,
  TokenUser,
} from "@/types";
import { authApiClient } from "@/api";
import { useAuthStore, useLocationStore } from "@/store";
import { router } from "expo-router";
import { QUERY_KEYS, ROUTES } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRegister = (): UseMutationResult<
  string,
  Error,
  RegisterInputDto
> => {
  const { setSignupStep } = useAuthStore();
  return useMutation({
    mutationFn: authApiClient.register,
    onSuccess: () => {
      setSignupStep(SIGN_UP_STEP.OTP);
      router.replace(ROUTES.OTP_VERIFICATION);
    },
  });
};

export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginInputDto
> => {
  const { setUser, setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: authApiClient.login,
    onSuccess: async ({ accessToken, refreshToken, tokenUser }) => {
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      setUser(tokenUser);
      setAuthenticated(true);
    },
  });
};

export const useLogout = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();

  const { setUser, setAuthenticated, clearAuth } = useAuthStore();
  const { resetLocation } = useLocationStore();
  return useMutation({
    mutationFn: authApiClient.logout,
    onSuccess: async () => {
      queryClient.clear();
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      setUser(null);
      setAuthenticated(false);
      resetLocation();
      clearAuth();
      AsyncStorage.clear(); //TODO: Remove later.
      router.replace(ROUTES.SELECT_ROLE);
    },
  });
};

export const useRequestOTP = (): UseMutationResult<
  string,
  Error,
  RequestOtpInputDto
> => {
  return useMutation({
    mutationFn: authApiClient.requestOtp,
  });
};

export const useVerityOTP = (): UseMutationResult<
  string,
  Error,
  VerifyOtpInputDto
> => {
  const { setSignupStep } = useAuthStore();

  return useMutation({
    mutationFn: authApiClient.verifyOtp,
    onSuccess: async (data) => {
      setSignupStep(SIGN_UP_STEP.DONE);
      router.replace(ROUTES.SIGN_IN);
    },
  });
};

export const useGetCurrentUser = (): UseQueryResult<TokenUser> => {
  return useQuery({
    queryKey: QUERY_KEYS.CURENT_USER.all,
    queryFn: authApiClient.getCurrentUser,
  });
};
