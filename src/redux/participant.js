import { createSlice } from "@reduxjs/toolkit";

export const participantSlice = createSlice({
  name: "participant",
  initialState: {
    participantList: [],
  },

  reducers: {
    setParticipant: (state, action) => {
      state.participantList = JSON.parse(JSON.stringify(action.payload));
    },

    clearParticipant: () => {},
  },
});

export const { setParticipant, clearParticipant } = participantSlice.actions;

export default participantSlice.reducer;
