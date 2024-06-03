import { createSlice } from "@reduxjs/toolkit";

const initialMailsState = {
  mails: [],
  receiverId: null,
  unread: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailsState,
  reducers: {
    sendMail(state, action) {
      state.mails.push(action.payload);
      state.receiverId = action.payload.receiverId;
    },
    setMails(state, action) {
      state.mails = action.payload;
      state.unread = state.mails
        .filter((mail) => !mail.read)
        .map((mail) => mail.id);
    },
    markAsRead(state, action) {
      const email = state.mails.find((mail) => mail.id === action.payload);
      if (email) {
        email.read = true;
      }
      state.unread = state.unread.filter((id) => id !== action.payload);
    },
    setDelete(state,action){
        state.mails = state.mails.filter((mail) => mail.id !== action.payload );
        state.unread = state.unread.filter((id) => id !== action.payload)
    }
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
