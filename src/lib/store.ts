import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Place } from "@/lib/geocode";
import type { BirthInput } from "@/lib/jyotish/chart";

type MonthCursor = { year: number; month: number };

type AppState = {
  birth: BirthInput | null;
  here: Place | null;
  editing: boolean;
  monthCursor: MonthCursor | null;
  selectedIso: string | null;
  view: "calendar" | "taras";
  setBirth: (birth: BirthInput) => void;
  setHere: (here: Place) => void;
  clearBirth: () => void;
  setEditing: (editing: boolean) => void;
  setMonthCursor: (cursor: MonthCursor) => void;
  selectDay: (iso: string | null) => void;
  setView: (view: "calendar" | "taras") => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      birth: null,
      here: null,
      editing: true,
      monthCursor: null,
      selectedIso: null,
      view: "calendar",
      setBirth: (birth) =>
        set({
          birth,
          editing: false,
          selectedIso: null,
        }),
      setHere: (here) => set({ here }),
      clearBirth: () =>
        set({
          birth: null,
          here: null,
          editing: true,
          monthCursor: null,
          selectedIso: null,
        }),
      setEditing: (editing) => set({ editing }),
      setMonthCursor: (monthCursor) => set({ monthCursor, selectedIso: null }),
      selectDay: (selectedIso) => set({ selectedIso }),
      setView: (view) => set({ view }),
    }),
    {
      name: "navtara-birth",
      partialize: (s) => ({ birth: s.birth, here: s.here, view: s.view }),
      onRehydrateStorage: () => (state) => {
        if (state?.birth) state.editing = false;
      },
    },
  ),
);
