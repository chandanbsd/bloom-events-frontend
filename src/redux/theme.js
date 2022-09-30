import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "user",
  initialState: {
    value: "light",
  },

  reducers: {
    setTheme: (state, action) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { setProfile } = themeSlice.actions;

export default themeSlice.reducer;
