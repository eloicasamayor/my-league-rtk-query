import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabaseUrl, supabaseKey } from "../constants";

export const leagues = createApi({
  reducerPath: "leagues",
  baseQuery: fetchBaseQuery({
    baseUrl: supabaseUrl,
    prepareHeaders: (headers) => {
      headers.set("apikey", `${supabaseKey}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLeagues: builder.query({ query: () => "/leagues" }),
    insertLeague: builder.mutation({
      query: ({ ...post }) => ({
        url: `/leagues`,
        method: "POST",
        body: post,
      }),
    }),
    updateLeague: builder.mutation({
      query: ({ ...patch }) => ({
        url: "/leagues",
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteLeague: builder.mutation({
      query: ({ ...body }) => ({
        url: "/leagues?id=eq." + body.id,
        method: "DELETE",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetLeaguesQuery,
  useInsertLeagueMutation,
  useUpdateLeagueMutation,
  useDeleteLeagueMutation,
} = leagues;
