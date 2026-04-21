"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  plan: string;
  credits: number;
  settings?: {
    preferred_language?: "id" | "en";
  };
}

interface ActiveTask {
  id: string;
  title: string;
  type?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  activeTasks: ActiveTask[];
}

interface AuthActions {
  login: (token: string, user: User) => void;
  logout: () => void;
  setCredentials: (token: string | null, user: User | null) => void;
  updateUserSettings: (settings: Partial<User["settings"]>) => void;
  addTask: (task: ActiveTask) => void;
  removeTask: (taskId: string) => void;
  clearTasks: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      activeTasks: [],

      login: (token, user) => {
        set({
          accessToken: token,
          user: user,
        });
        // Sync to cookie for middleware
        Cookies.set("access_token", token, { expires: 7, path: "/" });
        if (user?.role) {
          Cookies.set("user_role", user.role, { expires: 7, path: "/" });
        }
      },

      logout: () => {
        set({
          accessToken: null,
          user: null,
          activeTasks: [],
        });
        // Clear cookies
        Cookies.remove("access_token", { path: "/" });
        Cookies.remove("user_role", { path: "/" });
      },

      setCredentials: (accessToken, user) => {
        set({
          accessToken,
          user,
        });
        if (accessToken) {
          Cookies.set("access_token", accessToken, { expires: 7, path: "/" });
        } else {
          Cookies.remove("access_token", { path: "/" });
        }

        if (user?.role) {
          Cookies.set("user_role", user.role, { expires: 7, path: "/" });
        } else {
          Cookies.remove("user_role", { path: "/" });
        }
      },

      updateUserSettings: (settings) => {
        set((state) => ({
          user: state.user 
            ? { ...state.user, settings: { ...state.user.settings, ...settings } }
            : null
        }));
      },

      addTask: (task) => set((state) => ({ 
        activeTasks: [...state.activeTasks.filter(t => t.id !== task.id), task] 
      })),

      removeTask: (taskId) => set((state) => ({ 
        activeTasks: state.activeTasks.filter(t => t.id !== taskId) 
      })),

      clearTasks: () => set({ activeTasks: [] }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
