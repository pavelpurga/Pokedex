import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const postsAPI = createApi({
  reducerPath: 'postsAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
  tagTypes: ['Post'],
  endpoints: () => ({})
})