import api from "@/lib/api";
import type { User } from "@/types";
import { create } from "zustand";

type LoginFormState = {
  email: string;
  password: string;
};

type RegisterFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthState = {
  loggedIn: string | null;
  user: User | null;
  loginForm: LoginFormState;
  registerForm: RegisterFormState;
  loading: boolean;
  success: boolean;
  error: string;
  login: () => Promise<boolean>;
  register: () => Promise<boolean>;
  logout: () => void;
};

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem("user");
  if (!stored || stored === "undefined") return null;
  try {
    return JSON.parse(stored);
  } catch {
    console.log('parsing error');
    return null;
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  loggedIn: localStorage.getItem("token") || null,
  user: getStoredUser(),
  loginForm: {
    email: "",
    password: "",
  },
  registerForm: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  loading: false,
  success: false,
  error: "",
  login: async () => {
    try {
      set({ loading: true, error: "", success: false });
      const res = await api.post("/auth/login", get().loginForm);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        set({
          loggedIn: res.data.token,
          user: res.data.user, 
          success: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      set({
        error: "Invalid email or password",
      });
      console.log(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  register: async () => {
    const { password, confirmPassword } = get().registerForm;
    if (password !== confirmPassword) {
      set({ error: "Passwords do not match" });
      return false;
    }
    try {
      set({ loading: true, error: "", success: false });
      await api.post("/auth/register", get().registerForm);
      set({ success: true });
      return true;
    } catch (error) {
      set({
        error:"Registration failed",
      });
      console.log(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      loggedIn: null,
      user: null,
    });
  },
}));
