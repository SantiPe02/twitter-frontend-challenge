import { createSlice } from "@reduxjs/toolkit";
import { LIMIT } from "../util/Constants";
import { ChatDTO, Post } from "../service";

type InitalStateType = {
  feed: Post[];
  query: string;
  length: number;
  currentChat?: ChatDTO;
  lastPostId: string;
};

const initialState: InitalStateType = {
  feed: [],
  length: LIMIT,
  query: "",
  lastPostId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFeed: (state, action) => {
      state.feed = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    setChat: (state, action) => {
      state.currentChat = action.payload;
    },

    addMessage: (state, action) => {
      if (state.currentChat) {
        state.currentChat.messages.push(action.payload);
      }
    },

    setLastPostId: (state, action) => {
      state.lastPostId = action.payload;
    },
  },
});

export const { updateFeed, setLength, setQuery, setChat, addMessage, setLastPostId } =
  userSlice.actions;

export default userSlice.reducer;
