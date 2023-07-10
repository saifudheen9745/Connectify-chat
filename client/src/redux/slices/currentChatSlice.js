import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChatId: "",
  currentChat: "",
  currentChatMessages: [],
};

export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setCurrentMessages: (state, action) => {
      state.currentChatMessages = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    resetCurrentChatId: (state) => {
      state.currentChatId = "";
    },
    resetCurrentMessages: (state) => {
      state.currentChatMessages = "";
    },
    appendToCurrentMessages: (state, action) => {
      state.currentChatMessages = [
        ...state.currentChatMessages,
        action.payload,
      ];
    },
    resetCurrentChat: (state) => {
      state.currentChat = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentChat,
  resetCurrentChat,
  setCurrentMessages,
  resetCurrentMessages,
  setCurrentChatId,
  resetCurrentChatId,
  appendToCurrentMessages,
} = currentChatSlice.actions;
//For the store
export default currentChatSlice.reducer;
//To access the state details
export const currentChatReducer = (state) =>
  state.persistedReducer.currentChatReducer;
