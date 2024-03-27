import { create } from "zustand";

export const useAlgorithm = create((set) => ({
  algorithm: "",
  setAlgorithm: (algo) => set({ algo }),
}));
