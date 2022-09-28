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
    // setProfile: (state, action) => {
    //   action = action.payload;
    //   // state = { ...update.payload };
    //   state.firstName = action[0];
    //   state.lastName = action[1];
    //   state.email = action[2];
    //   state.userName = action[3];
    //   state.isOwner = action[4];
    // },
    setProfile: (state, action) => {
      const actionObj = { ...action.payload };
      // state = { ...update.payload };
      state.firstName = actionObj.firstName;
      state.lastName = actionObj.lastName;
      state.email = actionObj.email;
      state.userName = actionObj.userName;
      state.isOwner = actionObj.isOwner;
    },
  },
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;
