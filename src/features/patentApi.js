import { baseApi } from "../services/baseApi";

export const patentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET: getById (from your screenshot)
    getPatentById: builder.query({
      query: (id) => ({
        url: `/api/v1/patents/${id}`,
        method: "GET",
      }),
      providesTags: ["Patent"],
    }),

    // GET: GenerateAll (from your screenshot)
    generateAllPatent: builder.query({
      query: (id) => ({
        url: `/api/v1/patents/generateall/${id}`,
        method: "GET",
      }),
      // This might need to invalidate tags if it updates data immediately
      invalidatesTags: ["Patent"],
    }),

    // // PUT: Update specific section (implied from handleSaveSection)
    // updatePatentSection: builder.mutation({
    //   query: ({ id, field, content }) => ({
    //     url: `/api/provisionaldraft/update/${id}`,
    //     method: "PUT",
    //     body: { field, content },
    //   }),
    //   // Optimistic updates can be applied here, or just invalidate
    //   invalidatesTags: ["Patent"],
    // }),

    // // POST: Regenerate specific section (implied from handleRegenerate)
    // regeneratePatentSection: builder.mutation({
    //   query: ({ id, field }) => ({
    //     url: `/api/provisionaldraft/regenerate/${id}`,
    //     method: "POST",
    //     body: { field },
    //   }),
    //   invalidatesTags: ["Patent"],
    // }),

  }),
  overrideExisting: false,
});

export const {
  useGetPatentByIdQuery,
  useLazyGenerateAllPatentQuery, // Use Lazy for actions triggered by events
  // useUpdatePatentSectionMutation,
  // useRegeneratePatentSectionMutation
} = patentApi;