import { baseApi } from "../services/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET: GetLatestContent
    getLatestContent: builder.query({
      query: () => ({
        url: "/api/v1/user/Dashboard/content/get",
        method: "GET",
      }),
      providesTags: ["UserContent"],
    }),

    // GET: GetRecentThreeProject
    getRecentThreeProjects: builder.query({
      query: () => ({
        url: "/api/v1/user/Dashboard/project/recent/get",
        method: "GET",
      }),
      providesTags: ["UserProject"],
    }),

    // POST: CreateProject
    createProject: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Dashboard/upload",
        method: "POST",
        body: data,
      }),
      // Invalidates 'UserProject' so the 'RecentThreeProjects' list updates automatically
      invalidatesTags: ["UserProject"],
    }),

    // GET: All Article (Assuming pagination is needed like previous examples)
    getAllArticles: builder.query({
      query: ({ page, limit, search, category }) => ({
        url: "/api/v1/user/articles/all",
        method: "GET",
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(category && { category }),
        },
      }),
      providesTags: ["Articles"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetLatestContentQuery,
  useGetRecentThreeProjectsQuery,
  useCreateProjectMutation,
  useGetAllArticlesQuery
} = userApi;