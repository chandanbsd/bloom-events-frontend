import { createSlice } from "@reduxjs/toolkit";

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activityList: [],
  },

  reducers: {
    setActivity: (state, action) => {
      state.activityList = JSON.parse(JSON.stringify(action.payload));
    },

    clearActivity: () => {},
  },
});

export const { setActivity, clearActivity } = activitySlice.actions;

export default activitySlice.reducer;
