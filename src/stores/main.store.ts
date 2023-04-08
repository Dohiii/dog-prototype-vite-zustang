import { create } from "zustand"

interface IState {
  count: number
  inc: () => void
  blow: () => void
  removeAll: () => void
}

export const useStore = create<IState>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  blow: () => set((state) => ({ count: state.count - 1 })),
  removeAll: () => set((state) => ({ count: 0 })),
}))
