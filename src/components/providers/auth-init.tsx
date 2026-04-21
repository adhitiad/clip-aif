"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import axiosInstance from "@/lib/axios";

export function AuthInit({ children }: { children: React.ReactNode }) {
  const { accessToken, setCredentials, logout } = useAuthStore();
  const initRef = useRef(false);

  useEffect(() => {
    // Only run once and only if we have a token but no user yet (or to verify token)
    if (initRef.current) return;
    
    const verifyAuth = async () => {
      if (!accessToken) {
        // Ensure cookies are cleared if state is empty
        logout();
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/me");
        setCredentials(accessToken, response.data);
      } catch (err) {
        console.error("Auth initialization failed:", err);
        // If /auth/me fails, token might be invalid/expired
        logout();
      }
    };

    verifyAuth();
    initRef.current = true;
  }, [accessToken, setCredentials, logout]);

  return <>{children}</>;
}
