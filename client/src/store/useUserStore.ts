import { create } from "zustand"

type UserState = {
  count: number
  increment: () => void
}

export const useUserStore = create<UserState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
