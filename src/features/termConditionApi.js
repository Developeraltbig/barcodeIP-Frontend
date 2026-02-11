import { baseApi } from "../services/baseApi";

export const termConditionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getTermCondition: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/adminUser/term-condition/get/all",
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
      providesTags: ["TermCondition"],
    }),
    getTermConditionDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/adminUser/term-condition/get/${id}`,
        method: "GET",
      }),
    }),

    editTermCondition: builder.mutation({   
      query: ({ id, data }) => ({
        url: `/api/v1/adminUser/term-condition/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["TermCondition"],
    }),

    deleteTermCondition: builder.mutation({
      query: (id) => ({
        url: `/api/v1/adminUser/term-condition/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TermCondition"],
    }),
    AddTermCondition: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/adminUser/term-condition/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TermCondition"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTermConditionQuery,
  useGetTermConditionDetailsQuery,
  useEditTermConditionMutation,
  useDeleteTermConditionMutation,
  useAddTermConditionMutation
} = termConditionApi;
