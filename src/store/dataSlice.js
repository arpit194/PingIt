import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  conversations: [],
  conversation: null,
  messages: [],
  showSection: true,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage(state, { payload }) {
      state.messages = [...state.messages, ...payload];
    },
    clearMessages(state) {
      state.messages = [];
    },
    setContacts(state, { payload }) {
      state.contacts = payload;
    },
    addContact(state, { payload }) {
      state.contacts = [...state.contacts, payload];
    },
    setConversations(state, { payload }) {
      state.conversations = payload;
    },
    addConversation(state, { payload }) {
      state.conversations = [...state.conversations, payload];
    },
    setConversation(state, { payload }) {
      state.conversation = payload;
    },
    setShowSection(state, { payload }) {
      state.showSection = payload;
    },
    clearData(state) {
      state.contacts = [];
      state.conversations = [];
      state.messages = [];
      state.conversation = null;
      state.showSection = true;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
