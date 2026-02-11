import { baseApi } from "../services/baseApi";

export const adminUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getContent: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/adminUser/content/get/all",
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
      providesTags: ["Content"],
    }),

    getContentDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/adminUser/content/get/${id}`,
        method: "GET",
      }),
    }),

    editContent: builder.mutation({   
      query: ({ id, data }) => ({
        url: `/api/v1/adminUser/content/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),

    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/api/v1/adminUser/content/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Content"],
    }),
    AddContent: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/adminUser/content/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetContentQuery,
  useGetContentDetailsQuery,
  useEditContentMutation,
  useDeleteContentMutation,
  useAddContentMutation
} = adminUserApi;
