import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  primaryColor: "#3b82f6",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: (state) => {
    state.darkMode = !state.darkMode;
  },

  setPrimaryColor: (state, action) => {
    state.primaryColor = action.payload;
  },
  setTheme: (state, action) => {
    state.color = action.payload;
  },
});

export const { setTheme, toggleDarkMode, setPrimaryColor } = themeSlice.actions;

export default themeSlice.reducer;
