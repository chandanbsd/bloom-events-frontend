import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "user",
  initialState: {
    value: "light",
  },

  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
