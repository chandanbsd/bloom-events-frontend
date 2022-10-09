import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    eventList: "0",
  },

  reducers: {
    setEvent: (state, action) => {
      state.eventList = JSON.parse(JSON.stringify(action.payload));
      // state.value += 1;
    },

    clearEvent: () => {},
  },
});

export const { setEvent, clearEvent } = eventSlice.actions;

export default eventSlice.reducer;
