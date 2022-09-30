import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:4000/" }),
  endpoints: (builder) => ({
    getUserDetailsFromLogin: builder.query({
      query: (username) => `login/${username}`,
    }),
  }),
});

// export const { userGetUserDetailsFromLogin } =   ;
