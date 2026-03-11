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

   
  }),
  overrideExisting: false,
});

export const {
  useGetPatentByIdQuery,
  useLazyGenerateAllPatentQuery, // Use Lazy for actions triggered by events
  
} = patentApi;