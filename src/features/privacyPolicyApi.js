import { baseApi } from "../services/baseApi";

export const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     getPrivacyPolicy: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/v1/adminUser/privacy-policy/all",
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
      providesTags: ["PrivacyPolicy"],
    }),
    getPrivacyPolicyDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/adminUser/privacy-policy/get/${id}`,
        method: "GET",
      }),
    }),

    editPrivacyPolicy: builder.mutation({   
      query: ({ id, data }) => ({
        url: `/api/v1/adminUser/privacy-policy/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),

    deletePrivacyPolicy: builder.mutation({
      query: (id) => ({
        url: `/api/v1/adminUser/privacy-policy/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
    AddPrivacyPolicy: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/adminUser/privacy-policy/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPrivacyPolicyQuery,
  useGetPrivacyPolicyDetailsQuery,
  useEditPrivacyPolicyMutation,
  useDeletePrivacyPolicyMutation,
  useAddPrivacyPolicyMutation
} = privacyPolicyApi;
