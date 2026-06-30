import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  primaryColor: "#8BAD2B",

  color: "theme-blue",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setTheme: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setTheme, toggleDarkMode, setPrimaryColor } = themeSlice.actions;

export default themeSlice.reducer;
