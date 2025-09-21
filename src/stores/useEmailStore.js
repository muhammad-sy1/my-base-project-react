import { create } from "zustand";

export const useEmailStore = create((set) => ({
  signUpEmail: "",
  setSignUpEmail: (email) => set({ signUpEmail: email }),
}));
