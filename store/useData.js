import { create } from "zustand";

export const useData = create((set) => ({
  data: {
    ArrivalTime: [],
    BurstTime: [],
  },
  setData: (data) => set({ data }),
}));
