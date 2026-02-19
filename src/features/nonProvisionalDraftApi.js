import { baseApi } from "../services/baseApi";

export const nonProvisionalDraftApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET ALL (Pagination & Filtering - Standard Pattern)
    getNonProvisionalDraft: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status, role }) => ({
        url: "/api/nonprovisionaldraft/all", 
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
      providesTags: ["NonProvisionalDraft"],
    }),

    // GET BY ID (Details) - Matches 'getById' from screenshot
    getNonProvisionalDraftDetails: builder.query({
      query: (id) => ({
        url: `/api/nonprovisionaldraft/getbyId/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "NonProvisionalDraft", id }],
    }),

    // GENERATE ALL - Matches 'GenerateAll' from screenshot
    generateAllNonProvisionalDraft: builder.query({
      query: (id) => ({
        url: `/api/nonprovisionaldraft/generateall/${id}`,
        method: "GET",
      }),
      // Invalidate tags so the UI refreshes with the generated content
      invalidatesTags: ["NonProvisionalDraft"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNonProvisionalDraftQuery,
  useGetNonProvisionalDraftDetailsQuery,
  useLazyGenerateAllNonProvisionalDraftQuery, // 'Lazy' is best for manual triggers like "Generate"
} = nonProvisionalDraftApi;