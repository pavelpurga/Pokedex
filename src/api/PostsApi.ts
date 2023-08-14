import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {PostsTypes} from "../entitysData/models/Posts.types";

export const postsAPI = createApi({
  reducerPath: 'postsAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllPosts: build.query<PostsTypes[],number>({
      query: (limit)=> ({
        url: '/posts',
        params:{
          _limit: limit
        }
      }),
      providesTags: result => ['Post']
    })
  })
})