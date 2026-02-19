import { baseApi } from "../services/baseApi";

export const proposalDraftApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   

    // GET: getbyId
    getProposalDraftById: builder.query({
      query: (id) => ({
        url: `/api/v1/provisionalDraft/upload/${id}`, // Adjusted based on folder structure
        method: "GET",
      }),
      providesTags: ["ProposalDraft"],
    }),

    // GET: generateAll
    // Using Lazy Query in exports is recommended for this so it doesn't run automatically
    generateAllProposalDraft: builder.query({
      query: (id) => ({
        url: `/api/v1/provisionalDraft/generateall/${id}`,
        method: "GET",
      }),
      // Invalidates tags because generating might update the status/content
      invalidatesTags: ["ProposalDraft"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetProposalDraftByIdQuery,
  useLazyGenerateAllProposalDraftQuery, // Lazy is better for "Generate" buttons
} = proposalDraftApi;