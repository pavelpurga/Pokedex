import {postsAPI} from "../../api/PostsApi";
import {PostsTypes} from "../../entitysData/models/Posts.types";

export const injectApi = postsAPI.injectEndpoints({
  endpoints: (build) => ({
    fetchAllPosts: build.query<PostsTypes[], number>({
      query: (limit) => ({
        url: '/posts',
        params: {
          _limit: limit
        }
      }),
      providesTags: result => ['Post']
    }),
    createPost: build.mutation<PostsTypes, PostsTypes>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    updatePost: build.mutation<PostsTypes, PostsTypes>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    deletePost: build.mutation<PostsTypes, PostsTypes>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post']
    })
  })
});