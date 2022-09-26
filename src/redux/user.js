import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastName: null,
    email: null,
    userName: null,
    isOwner: null,
  },

  reducers: {
    setProfile: (state, update) => {
      update = update.payload;
      state.firstName = update[0];
      state.lastName = update[1];
      state.email = update[2];
      state.userName = update[3];
      state.isOwner = update[4];
    },
  },
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;
