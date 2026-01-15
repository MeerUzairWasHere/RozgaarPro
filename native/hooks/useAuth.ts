import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { RegisterInputDto, LoginInputDto, AuthResponse } from "@/types";
import { authApi } from "@/api/authApi";
import { Toast } from "toastify-react-native";
import { getErrorMessage } from "@/utils/error.message";
import { useAuthStore } from "@/store";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { ROUTES } from "@/constants";

export const useRegister = (): UseMutationResult<
  string,
  Error,
  RegisterInputDto
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginInputDto
> => {
  const queryClient = useQueryClient();
  const { setUser, setAuthenticated, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      setLoading(false);
      setUser(data.TokenUser);
      setAuthenticated(true);

      queryClient.clear();
      Toast.success("Login Successful");

      router.replace(ROUTES.HOME);
    },
    onError: (error) => {
      setLoading(false);
      Toast.error(getErrorMessage(error));
    },
  });
};

export const useLogout = (): UseMutationResult<void, Error, void> => {
  const queryClient = useQueryClient();

  const { setUser, setAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      queryClient.clear();
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      setUser(null);
      setAuthenticated(false);
      router.replace(ROUTES.SELECT_ROLE);
    },
  });
};
