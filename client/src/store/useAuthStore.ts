import api from "@/lib/api";
import { create } from "zustand"

type LoginFormState = {
  email: string;
  password: string;
};

type RegisterFormState = {
  name: string,
  email: string;
  password: string;
  confirmPassword: string,
};

type AuthState = {
  loginForm: LoginFormState,
  registerForm: RegisterFormState,
  loading: boolean,
  success: boolean,
  error: string,
  login: () => Promise<void>,
  register: () => Promise<void>,
}

export const useAuthStore = create<AuthState>((set,get) => ({
  loginForm: {
    email: '',
    password: '',
  },
  registerForm: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  loading: false,
  success: false,
  error: '',
  login: async () => {
    set({loading: true})
    await api.post("/auth/login", get().loginForm)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      set({success: true})
    })
    .catch((error) => {
      set({error: error.response?.data?.error || "Invalid email or password"});
    })
    set({loading: false})
  },
  register: async () => {
     if (get().registerForm.password !== get().registerForm.confirmPassword) {
      set({error: "Passwords do not match"});
      return;
    }
    set({loading: true})
    api.post("/auth/register", get().registerForm)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      set({success: true})
    })
    .catch((error) => {
      set({error: error.response?.data?.error || "Invalid email or password"});
    });
    set({loading: false});
  }
}))
