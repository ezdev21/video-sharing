import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

// -----------------------------
// Axios instance
// -----------------------------
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

// -----------------------------
// Helper: get token safely
// -----------------------------
const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
};

// -----------------------------
// Request interceptor
// -----------------------------
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      // Prefer Authorization header
      config.headers.Authorization = `Bearer ${accessToken}`;
      // If your backend expects custom header instead:
      // config.headers.token = accessToken;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// -----------------------------
// Response interceptor
// -----------------------------
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    // Network / connection error
    if (!error.response) {
      toast.error("Connection Error", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }

    // Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
