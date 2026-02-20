import { baseApi } from "../services/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // Existing endpoints remain unchanged...
    getLatestContent: builder.query({
      query: () => ({ url: "/api/v1/user/Dashboard/content/get", method: "GET" }),
      providesTags: ["UserContent"],
    }),

    getRecentThreeProjects: builder.query({
      query: () => ({ url: "/api/v1/user/Dashboard/project/recent/get", method: "GET" }),
      providesTags: ["UserProject"],
    }),

    createProject: builder.mutation({
      query: (data) => ({ url: "/api/v1/user/Dashboard/upload", method: "POST", body: data }),
      invalidatesTags: ["UserProject", "AllProjects"],
    }),

    getAllArticles: builder.query({
      query: ({ page, limit, search, category }) => ({
        url: "/api/v1/user/articles/all",
        method: "GET",
        params: { page, limit, ...(search && { search }), ...(category && { category }) },
      }),
      providesTags: ["Articles"],
    }),

    // GET: Fetch All Project
    fetchAllProjects: builder.query({
      query: () => ({
        url: "/api/v1/projects/fetchallproject",
        method: "GET",
      }),
      providesTags: ["AllProjects"],
    }),

    // GET: getPatentByProjectId
    getPatentByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/patent/${projectId}`,
        method: "GET",
      }),
    }),

    // GET: getProvisionalByProjectId
    getProvisionalByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/provisional/${projectId}`,
        method: "GET",
      }),
    }),

    // GET: getNonProvisionalByProjectId
    getNonProvisionalByProjectId: builder.query({
      query: (projectId) => ({
        url: `//api/v1/user/Dashboard/get/non-provisional/${projectId}`,
        method: "GET",
      }),
    }),

    // GET: getProductByProjectId
    getProductByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/product/${projectId}`,
        method: "GET",
      }),
    }),

    // GET: getPublicationByProjectId
    getPublicationByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/publication/${projectId}`,
        method: "GET",
      }),
    }),

    // GET: connectAnalyst
    connectAnalyst: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/project/connect-analyst/${projectId}`,
        method: "GET",
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetLatestContentQuery,
  useGetRecentThreeProjectsQuery,
  useCreateProjectMutation,
  useGetAllArticlesQuery,
  // New exported hooks
  useFetchAllProjectsQuery,
  useGetPatentByProjectIdQuery,
  useGetProvisionalByProjectIdQuery,
  useGetNonProvisionalByProjectIdQuery,
  useGetProductByProjectIdQuery,
  useGetPublicationByProjectIdQuery,
  useConnectAnalystQuery
} = userApi;