import { baseApi } from "../services/baseApi";

export const patentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET: getById
    getPatentById: builder.query({
      query: (id) => ({
        url: `/api/v1/patents/${id}`,
        method: "GET",
      }),
      providesTags: ["Patent"],
    }),

    getBibilioData: builder.mutation({
      query: (patent_id) => ({
        url: "/api/v1/patents/bibilioData",
        method: "POST",
        body: {
          patent_id,
        },
      }),
    }),
    getPatentDescription: builder.query({
      query: (url) => ({
        url: `/api/v1/patents/description?url=${encodeURIComponent(url)}`,
        method: "GET",
      }),
    }),
    // GET: GenerateAll
    generateAllPatent: builder.query({
      query: (id) => ({
        url: `/api/v1/patents/generateall/${id}`,
        method: "GET",
      }),
      // This might need to invalidate tags if it updates data immediately
      invalidatesTags: ["Patent"],
    }),


  }),
  overrideExisting: false,
});

export const {
  useGetPatentByIdQuery,
  useGetPatentDescriptionQuery,
  useGetBibilioDataMutation,
  useLazyGenerateAllPatentQuery, // Use Lazy for actions triggered by events

} = patentApi;