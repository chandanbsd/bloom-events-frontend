import { createSlice } from "@reduxjs/toolkit";

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activityList: [],
  },

  reducers: {
    setActivity: (state, action) => {
      console.log(action.payload);
      state.activityList = JSON.parse(JSON.stringify(action.payload));
      // state.value += 1;
    },

    clearActivity: () => {},
  },
});

export const { setActivity, clearActivity } = activitySlice.actions;

export default activitySlice.reducer;
