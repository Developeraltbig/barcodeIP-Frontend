import { baseApi } from "../services/baseApi";

export const proposalDraftApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getProposalDraftById: builder.query({
      query: (id) => ({
        url: `/api/v1/provisionalDraft/upload/${id}`,
        method: "GET",
      }),
      providesTags: ["ProposalDraft"],
    }),

    generateAllProposalDraft: builder.query({
      query: (id) => ({
        url: `/api/v1/provisionalDraft/generateall/${id}`,
        method: "GET",
      }),
      providesTags: ["ProposalDraft"],
    }),

    updateProposalDraftSection: builder.mutation({
      query: ({ projectId, field, content }) => ({
        url: `/api/v1/provisionalDraft/update/${projectId}`,
        method: "PUT",
        body: {
          field,
          content,
        },
      }),
      invalidatesTags: ["ProposalDraft"],
    }),

    regenerateProposalDraftSection: builder.mutation({
      query: ({ projectId, field }) => ({
        url: `/api/v1/provisionalDraft/regenerate/${projectId}`,
        method: "POST", // Recommended
        body: {
          field,
        },
      }),
      invalidatesTags: ["ProposalDraft"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetProposalDraftByIdQuery,
  useLazyGenerateAllProposalDraftQuery,

  useUpdateProposalDraftSectionMutation,
  useRegenerateProposalDraftSectionMutation,

} = proposalDraftApi;