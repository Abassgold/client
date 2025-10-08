import { createSlice } from "@reduxjs/toolkit";

const getInitialMode = (): boolean => {
  if (typeof window !== "undefined") {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      return storedMode === "true";
    }
    
    localStorage.setItem("darkMode", "true");
    return true;
  }
  return true;
};

const initialState: boolean = getInitialMode();

export const darkMode = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      const newState = !state;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", newState ? "true" : "false");
      }
      return newState;
    },
    setDarkMode: (_, action) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", action.payload ? "true" : "false");
      }
      return action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkMode.actions;
export default darkMode.reducer;
