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
      onRehydrateStorage: (state) => {},
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

export const useSearchStore = create(
  (set, get) => ({
    searchTerm: "",
    setSearchTerm: (searchTerm) => set({ searchTerm }),
  }),
  {
    name: "searchStore",
  }
);
