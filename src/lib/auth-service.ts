import api from "./api";
import { useAuthStore } from "./auth-store";
import type {
  BootstrapOwnerRequest,
  RoleUpdateRequest,
  Token,
  UserCreate,
  UserOut,
} from "./types";

export const authService = {
  async login(
    username: string,
    password: string,
  ): Promise<{ token: Token; user: UserOut }> {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("grant_type", "password");

    const response = await api.post<Token>("/auth/token", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    } as any);

    // Get user info
    const userResponse = await api.get<UserOut>("/auth/me");

    return {
      token: response.data,
      user: userResponse.data,
    };
  },

  async register(
    userData: UserCreate,
  ): Promise<{ token: Token; user: UserOut }> {
    const response = await api.post<Token>("/auth/register", userData);

    // Auto login after register
    const userResponse = await api.get<UserOut>("/auth/me");

    return {
      token: response.data,
      user: userResponse.data,
    };
  },

  async bootstrapOwner(data: BootstrapOwnerRequest): Promise<UserOut> {
    const response = await api.post<UserOut>("/auth/bootstrap-owner", data);
    return response.data;
  },

  async setRole(data: RoleUpdateRequest): Promise<UserOut> {
    const response = await api.post<UserOut>("/auth/set-role", data);
    return response.data;
  },

  async getMe(): Promise<UserOut> {
    const response = await api.get<UserOut>("/auth/me");
    return response.data;
  },

  async logout(): Promise<void> {
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }
    useAuthStore.getState().logout();
  },
};
