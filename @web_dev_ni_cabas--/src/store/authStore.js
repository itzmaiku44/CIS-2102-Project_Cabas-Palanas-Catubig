import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  setAuth: (token, user) =>
    set({
      isAuthenticated: !!token,
      token: token,
      user: user,
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      token: null,
      user: null,
    }),
}));

export default useAuthStore;
