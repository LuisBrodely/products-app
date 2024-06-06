import { create } from "zustand";
import type { User } from "../../domain/entities/user";
import type { AuthStatus } from "../../infrastructure/interfaces/auth.status";
import { authLogin } from "../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/async-storage";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);
    if (!response) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    await StorageAdapter.setItem("token", response.token);
    const storedToken = await StorageAdapter.getItem("token");
    console.log(storedToken);

    set({
      status: "authenticated",
      token: response.token,
      user: response.user,
    });

    return true;
  },
  logout: () =>
    set({ status: "unauthenticated", user: undefined, token: undefined }),
}));