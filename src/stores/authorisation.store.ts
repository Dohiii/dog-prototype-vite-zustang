import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type State = {
  loggedIn: boolean
  profile: string
  accessToken: string
}

type Action = {
  logIn: () => void
  logOut: () => void
  saveProfile: (profile: State["profile"]) => void
  saveAccessToken: (accessToken: State["accessToken"]) => void
}

// export const useAuthStore = create<State & Action>((set) => ({
//   loggedIn: Boolean(localStorage.getItem("accessToken")),
//   profile: "",
//   accessToken: "",
//   logIn: () => set(() => ({ loggedIn: true })),
//   logOut: () => set(() => ({ loggedIn: false })),
//   saveProfile: (profile) => set(() => ({ profile: profile })),
//   saveAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
// }))
export const useAuthStore = create<State & Action>()(
  persist(
    (set, get) => ({
      loggedIn: false,
      profile: "",
      accessToken: "",
      logIn: () => set({ loggedIn: (get().loggedIn = true) }),
      logOut: () => set({ loggedIn: (get().loggedIn = false) }),
      saveProfile: (profile) => set(() => ({ profile: (get().profile = profile) })),
      saveAccessToken: (accessToken) => set({ accessToken: (get().accessToken = accessToken) }),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
