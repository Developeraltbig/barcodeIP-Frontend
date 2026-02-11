import { baseApi } from "../services/baseApi";

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAboutUs: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/adminUser/about-us/all",
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

    getAboutUsDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/adminUser/about-us/getById/${id}`,
        method: "GET",
      }),
    }),

    editAboutUs: builder.mutation({   
      query: ({ id, data }) => ({
        url: `/api/v1/adminUser/about-us/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),

    deleteAboutUs: builder.mutation({
      query: (id) => ({
        url: `/api/v1/adminUser/about-us/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Content"],
    }),
    AddAboutUs: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/adminUser/about-us/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Content"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAboutUsQuery,
  useGetAboutUsDetailsQuery,
  useEditAboutUsMutation,
  useDeleteAboutUsMutation,
  useAddAboutUsMutation
} = aboutUsApi;
