import { createSlice } from "@reduxjs/toolkit";
import { LIMIT } from "../util/Constants";
import { ChatDTO, Post } from "../service";

type InitalStateType = {
  feed: Post[];
  comments: Post[];
  profileFeed: Post[];
  query: string;
  length: number;
  currentChat?: ChatDTO;
  lastPostId: string;
  chats: ChatDTO[];
  limit: number;
};

const initialState: InitalStateType = {
  feed: [],
  comments: [],
  profileFeed: [],
  length: LIMIT,
  query: "",
  lastPostId: "",
  chats: [],
  limit: LIMIT,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFeed: (state, action) => {
      state.feed = action.payload;
    },
    updateComments: (state, action) => {
      state.comments = action.payload;
    },
    updateProfileFeed: (state, action) => {
      state.profileFeed = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },

    addChat: (state, action) => {
      state.chats.push(action.payload);
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

    setLimit: (state, action) => {
      state.limit = action.payload;
    }
  },
});

export const {
  updateFeed,
  updateComments,
  updateProfileFeed,
  setLength,
  setQuery,
  setChat,
  addMessage,
  setLastPostId,
  setChats,
  addChat,
  setLimit,
} = userSlice.actions;

export default userSlice.reducer;
