import { baseApi } from "../services/baseApi";

export const adminUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAdminUsers: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/adminUser/listAdminUser",
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
      providesTags: ["AdminUser"],
    }),

    getAdminUserDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/adminUser/admin-user-details/${id}`,
        method: "GET",
      }),
    }),

    editAdminUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/adminUser/edit-user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminUser"],
    }),

    deleteAdminUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/adminUser/admineuser-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUser"],
    }),
    AddAdminUser: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/auth/admin-user/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminUser"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminUsersQuery,
  useGetAdminUserDetailsQuery,
  useEditAdminUserMutation,
  useDeleteAdminUserMutation,
  useAddAdminUserMutation
} = adminUserApi;
