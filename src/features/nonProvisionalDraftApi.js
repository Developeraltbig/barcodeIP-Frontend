import { baseApi } from "../services/baseApi";

export const nonProvisionalDraftApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getNonProvisionalDraft: builder.query({
      query: ({ page, limit, sortBy, sortOrder, search, status }) => ({
        url: "/api/nonprovisionaldraft/all",
        method: "GET",
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          ...(search && { search }),
          ...(status && { status })
        }
      }),
      providesTags: ["NonProvisionalDraft"]
    }),

    getNonProvisionalDraftDetails: builder.query({
      query: (id) => ({
        url: `/api/nonprovisionaldraft/getbyId/${id}`,
        method: "GET"
      }),
      providesTags: (result, error, id) => [
        { type: "NonProvisionalDraft", id }
      ]
    }),

    generateAllNonProvisionalDraft: builder.query({
      query: (id) => ({
        url: `/api/nonprovisionaldraft/generateall/${id}`,
        method: "GET"
      })
    }),

    updateNonProvisionalSection: builder.mutation({
      query: ({ projectId, field, content }) => ({
        url: `/api/v1/nonProvisionalDraft/update/${projectId}`,
        method: "PUT",
        body: {
          field,
          content
        }
      }),
      invalidatesTags: ["NonProvisionalDraft"]
    }),

    regenerateNonProvisionalSection: builder.mutation({
      query: ({ projectId, field }) => ({
        url: `/api/v1/nonProvisionalDraft/regenerate/${projectId}`,
        method: "POST",
        body: {
          field
        }
      })
    })

  })
});

export const {
  useGetNonProvisionalDraftQuery,
  useGetNonProvisionalDraftDetailsQuery,
  useLazyGenerateAllNonProvisionalDraftQuery,

  useUpdateNonProvisionalSectionMutation,
  useRegenerateNonProvisionalSectionMutation

} = nonProvisionalDraftApi;