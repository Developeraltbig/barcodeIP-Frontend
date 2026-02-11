import { baseApi } from "../services/baseApi";

export const userSpecificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getUserSpecification: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/admin/get-all",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          ...(search && { search }),
          ...(status && { status }),
          ...(role && { role }),
        },
      }),
      providesTags: ["UserSpecification"],
    }),

    getUserSpecificationDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/admin/user-details/${id}`,
        method: "GET",
      }),
    }),

    editUserSpecification: builder.mutation({   // ????
      query: ({ id, data }) => ({
        url: `/api/v1/admin/edit-user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UserSpecification"],
    }),

    deleteUserSpecification: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admin/user-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserSpecification"],
    }),
    AddUserSpecification: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserSpecification"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserSpecificationQuery,
  useGetUserSpecificationDetailsQuery,
  useEditUserSpecificationMutation,
  useDeleteUserSpecificationMutation,
  useAddUserSpecificationMutation
} = userSpecificationApi;
