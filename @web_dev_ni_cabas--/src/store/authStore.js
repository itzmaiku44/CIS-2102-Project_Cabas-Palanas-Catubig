import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null; // Return null if user doesn't exist or is invalid
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null; // Fallback to null if JSON parsing fails
    }
  })(),

  setAuth: (token, user) => {
    try {
      localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user)); // Store user as a JSON string
      }
      set({
        isAuthenticated: !!token,
        token: token,
        user: user,
      });
    } catch (error) {
      console.error("Error saving user or token to localStorage:", error);
    }
  },

  updateUserProfile: (updatedUser) =>
    set((state) => {
      try {
        const updatedUserData = { ...state.user, ...updatedUser }; // Merge the updated user data
        if (updatedUserData) {
          localStorage.setItem("user", JSON.stringify(updatedUserData)); // Persist updated user
        }
        return {
          user: updatedUserData,
        };
      } catch (error) {
        console.error("Error updating user profile:", error);
        return state; // Return previous state in case of error
      }
    }),

  logout: () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({
        isAuthenticated: false,
        token: null,
        user: null,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },
}));

export default useAuthStore;
