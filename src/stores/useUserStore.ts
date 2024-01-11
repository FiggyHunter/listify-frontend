import create from "zustand";
import { persist } from "zustand/middleware";

export const useJwtStore = create(
  persist(
    (set, get) => ({
      jwt: "noToken",
      setJwt: (jwt) => set({ jwt }),
    }),
    {
      name: "jwtStore",
      onRehydrateStorage: (state) => {
        console.log("Rehydrated jwtStore:", state);
      },
    }
  )
);

export const useDarkModeStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      setDarkMode: (darkMode) => set({ darkMode }),
    }),
    {
      name: "darkModeStore",
    }
  )
);
