import api from "../../api/axios";
import { endpoints } from "../../api/endpoints";
import { ApiResponse } from "../../types/api";
import { AuthPayload, AuthUser } from "../../types/auth";

export const login = async (payload: {
  email: string;
  password: string;
}): Promise<AuthPayload> => {
  const response = await api.post<ApiResponse<AuthPayload>>(
    endpoints.auth.login,
    payload
  );

  if (!response.data.data) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): Promise<AuthPayload> => {
  const response = await api.post<ApiResponse<AuthPayload>>(
    endpoints.auth.register,
    payload
  );

  if (!response.data.data) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const getMe = async (): Promise<AuthUser> => {
  const response = await api.get<ApiResponse<AuthUser>>(endpoints.auth.me);
  if (!response.data.data) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

export const logout = async (): Promise<void> => {
  await api.post(endpoints.auth.logout);
};