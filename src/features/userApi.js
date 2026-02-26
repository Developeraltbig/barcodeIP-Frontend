import { baseApi } from '../services/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Dashboard Content ---
    getLatestContent: builder.query({
      query: () => ({
        url: '/api/v1/user/Dashboard/content/get',
        method: 'GET'
      }),
      providesTags: ['UserContent']
    }),

    getRecentThreeProjects: builder.query({
      query: () => ({
        url: '/api/v1/user/Dashboard/project/recent/get',
        method: 'GET'
      }),
      providesTags: ['RecentProject']
    }),

    // --- Project Management ---
    createProject: builder.mutation({
      query: (data) => ({
        url: '/api/v1/user/Dashboard/upload',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['UserProject']
    }),

    fetchAllProjects: builder.query({
      query: () => ({
        url: '/api/v1/projects/fetchallproject',
        method: 'GET'
      }),
      providesTags: ['AllProjects']
    }),

    // --- Articles ---
    getAllArticles: builder.query({
      query: () => ({
        url: '/api/v1/user/Dashboard/all/article/get',
        method: 'GET'
      }),
      providesTags: ['Articles']
    }),

    // --- Specific Project Details (Lazy-ready) ---
    getPatentByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/patent/${projectId}`,
        method: 'GET'
      })
    }),

    getProvisionalByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/provisional/${projectId}`,
        method: 'GET'
      })
    }),

    getNonProvisionalByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/non-provisional/${projectId}`,
        method: 'GET'
      })
    }),

    getProductByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/product/${projectId}`,
        method: 'GET'
      })
    }),

    getPublicationByProjectId: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/get/publication/${projectId}`,
        method: 'GET'
      })
    }),

    getAnalystConnections: builder.query({
      query: (projectId) => ({
        url: `/api/v1/user/Dashboard/project/connect-analyst/${projectId}`,
        method: 'POST'
      }),
      providesTags: ['AnalystConnection']
    }),

    // --- Support Analysts ---
    getSupportAnalysts: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: '/api/v1/user/Dashboard/support-analyst/get',
        method: 'GET',
        params: { page, limit }
      }),
      providesTags: ['SupportAnalysts']
    })
  }),
  overrideExisting: false
});

// Exporting both standard and Lazy versions
export const {
  useGetLatestContentQuery,
  useCreateProjectMutation,
  useAnalystConnectionsMutation,
  useGetAllArticlesQuery,
  useGetSupportAnalystsQuery,
  useFetchAllProjectsQuery,

  // These specific detail hooks should be used as 'useLazy...' in your components
  // to allow manual triggering on button clicks.
  useGetPatentByProjectIdQuery,
  useLazyGetPatentByProjectIdQuery,

  useGetProvisionalByProjectIdQuery,
  useLazyGetProvisionalByProjectIdQuery,

  useGetNonProvisionalByProjectIdQuery,
  useLazyGetNonProvisionalByProjectIdQuery,

  useGetProductByProjectIdQuery,
  useLazyGetProductByProjectIdQuery, // <-- This is the one for your "View More" button

  useGetPublicationByProjectIdQuery,
  useLazyGetPublicationByProjectIdQuery,

  useGetRecentThreeProjectsQuery, // For Search History
  
} = userApi;
