import {createAction} from "@reduxjs/toolkit";
import {PostsTypes} from "../entitysData/models/Posts.types";

export const addPost = createAction('ADD_POST', (post: PostsTypes) => ({
  payload: post
}));

export const deletePost = createAction('REMOVE_POST', (postId : number)=>({
  payload: postId
}))

export const updatePost = createAction('UPDATE_POST', (post: PostsTypes)=>({
  payload: post
}))


export type PostActionsTypes = ReturnType<typeof addPost | typeof deletePost | typeof updatePost>