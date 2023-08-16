import {createSlice} from "@reduxjs/toolkit";
import {PostsTypes} from "../entitysData/models/Posts.types";

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
  reducers: {
    addPost(state, action){
      const newPost = action.payload;
      const nextId = state.posts.length > 0 ? state.posts[state.posts.length - 1].id + 1 : 1;
      const postWithNewId = { ...newPost, id: nextId };
      state.posts.push(postWithNewId);
    },
    updatePost(state,action){
      const { id, title } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex].title = title;
      }
    },
    deletePost(state, action){
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    }
  },
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

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
