import { create } from "zustand";
import type { User } from "../../domain/entities/user";
import type { AuthStatus } from "../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authRegister } from "../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/async-storage";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
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
    console.log('Logged in', response);

    set({
      status: "authenticated",
      token: response.token,
      user: response.user,
    });

    return true;
  },
  register: async (fullName: string, email: string, password: string) => {
    const response = await authRegister(fullName, email, password);

    if (!response) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    await StorageAdapter.setItem("token", response.token);
    const storedToken = await StorageAdapter.getItem("token");
    console.log('Registered', response);
    
    set({
      status: "authenticated",
      token: response.token,
      user: response.user,
    });

    return true;
  },
  checkStatus: async () => {
    const response = await authCheckStatus();
    if (!response) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return;
    }

    await StorageAdapter.setItem("token", response.token);
    set({
      status: "authenticated",
      token: response.token,
      user: response.user,
    });
  },
  logout: async () => {
    await StorageAdapter.removeItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
