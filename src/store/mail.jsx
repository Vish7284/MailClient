import { createSlice } from "@reduxjs/toolkit";

const initialMailsState = {
  mails: [],
  sent:[],
  receiverId: null,
  unreadInbox: [],
  unreadSent:[]
};

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailsState,
  reducers: {
    sendMail(state, action) {
      state.mails.push(action.payload);
      state.sent.push(action.payload);
      state.receiverId = action.payload.receiverId;
      console.log("reducer", state.sent);
    },
    setMails(state, action) {
      state.mails = action.payload;
      state.unreadInbox = state.mails
        .filter((mail) => !mail.read)
        .map((mail) => mail.id);
    },
    setSent(state, action) {
      state.sent = action.payload;
      state.unreadSent = state.sent
        .filter((send) => !send.read)
        .map((send) => send.id);
    },
    markAsRead(state, action) {
      const email = state.mails.find((mail) => mail.id === action.payload);
      if (email) {
        email.read = true;
      }
      state.unreadInbox = state.unreadInbox.filter((id) => id !== action.payload);
    },
    markSentRead(state, action) {
      const email = state.sent.find((send) => send.id === action.payload);
      if (email) {
        email.read = true;
      }
      state.unreadSent = state.unreadSent.filter((id) => id !== action.payload);
    },
    setDelete(state, action) {
      state.mails = state.mails.filter((mail) => mail.id !== action.payload);
      state.unreadInbox = state.unreadInbox.filter((id) => id !== action.payload);
    },
    setSentDelete(state, action) {
      state.sent = state.sent.filter((mail) => mail.id !== action.payload);
      state.unreadSent = state.unreadSent.filter((id) => id !== action.payload);
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
