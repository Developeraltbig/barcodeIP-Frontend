import { baseApi } from "../services/baseApi";

export const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getArticle: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/adminUser/article/get/all",
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
      providesTags: ["Article"],
    }),
    getArticleDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/adminUser/article/get/${id}`,
        method: "GET",
      }),
    }),

    editArticle: builder.mutation({   
      query: ({ id, data }) => ({
        url: `/api/v1/adminUser/article/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),

    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/api/v1/adminUser/article/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
    addArticle: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/adminUser/article/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Article"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetArticleQuery,
  useGetArticleDetailsQuery,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useAddArticleMutation
} = articleApi;
