import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventList: [],
  },

  reducers: {
    setEvent: (state, action) => {
      state.eventList = JSON.parse(JSON.stringify(action.payload));
    },

    clearEvent: () => {},
  },
});

export const { setEvent, clearEvent } = eventSlice.actions;

export default eventSlice.reducer;
