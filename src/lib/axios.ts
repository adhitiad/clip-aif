import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically inject Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get state directly from store instance (works outside of React components too)
    const token = useAuthStore.getState().accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors like 401 & notifications
axiosInstance.interceptors.response.use(
  (response) => {
    // Show success toast for specific creation endpoints (e.g., Celery tasks)
    if (response.config.method !== 'get' && response.status === 201 || response.status === 202) {
      const message = response.data?.message || "Permintaan berhasil diproses!";
      toast.success(message);
    }
    return response;
  },
  (error: AxiosError) => {
    const errorData = error.response?.data as any;
    const errorMessage = errorData?.detail || errorData?.message || "Terjadi kesalahan pada server.";

    if (error.response?.status === 401) {
      // Clear store on unauthorized
      useAuthStore.getState().logout();
      
      // Redirect to login only on client-side
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    } else {
      // Show error toast for everything except 401
      toast.error(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
