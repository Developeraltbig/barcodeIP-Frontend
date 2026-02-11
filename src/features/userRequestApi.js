import { baseApi } from "../services/baseApi";

export const userRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAllRequest: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/auth/admin-user/all-request",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          ...(search && { search }),
          ...(status && { status }),
        },
      }),
      providesTags: ["UserRequest"],
    }),
    editUserRequest: builder.mutation({   
      query: ({ data }) => ({
        url: `/api/v1/auth/admin-user/request`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UserRequest"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserAllRequestQuery,
  useEditUserRequestMutation
} = userRequestApi;
