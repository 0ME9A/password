import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  contributions: number;
}

export const githubApiContributors = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  endpoints: (builder) => ({
    getContributors: builder.query<Contributor[], string>({
      query: (repo) => `repos/${repo}/contributors`,
    }),
  }),
});

export const { useGetContributorsQuery } = githubApiContributors;
