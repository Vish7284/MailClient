import { createSlice } from "@reduxjs/toolkit";

const IntitialMailsState = { mails: [], receiverId: null };

const mailSlice = createSlice({
  name: "mail",
  initialState: IntitialMailsState,
  reducers: {
    sendMail(state, action) {
      state.mails = [...state.mails, action.payload];
      state.receiverId = action.payload.receiverId;
      console.log(state.receiverId);
      console.log(state.mails);
    },
    setMails(state, action) {
      state.mails = action.payload;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
