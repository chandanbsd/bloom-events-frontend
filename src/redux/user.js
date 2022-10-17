import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastName: null,
    email: null,
    userName: null,
    isOwner: null,
    age: null,
    gender: null,
    isAvailable: null,
    bio: null,
    categoryType: null,
    categoryLevel: null,
    city: null,
    state: null,
  },

  reducers: {
    setProfile: (state, action) => {
      const actionObj = { ...action.payload };
      state.firstName = actionObj.firstName;
      state.lastName = actionObj.lastName;
      state.email = actionObj.email;
      state.userName = actionObj.userName;
      state.isOwner = actionObj.isOwner;
      state.age = actionObj.age;
      state.gender = actionObj.gender;
      state.isAvailable = actionObj.isAvailable;
      state.bio = actionObj.bio;
      state.categoryType = actionObj.categoryType;
      state.categoryLevel = actionObj.categoryLevel;
      state.city = actionObj.city;
      state.state = actionObj.state;
    },
  },
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;
