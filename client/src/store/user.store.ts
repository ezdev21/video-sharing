import type { User } from "@/types"
import { create } from "zustand"

type UserState = {
  user: User | null
}

export const useUserStore = create<UserState>(() => ({
  user: null,
}))
