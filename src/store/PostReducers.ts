import {createSlice} from "@reduxjs/toolkit";
import {PostsTypes} from "../models/Posts.types";
import {addPost, deletePost, updatePost} from "./PostActions";

interface PostState{
  posts: PostsTypes[],
  loading: boolean,
  error: string,
}

const initialState : PostState = {
  posts: [],
  loading: false,
  error: '',
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost, (state, action) => {
        const { id, title } = action.payload;
        const postIndex = state.posts.findIndex((post) => post.id === id);
        if (postIndex !== -1) {
          state.posts[postIndex].title = title;
        }
      })
      .addCase(deletePost, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;