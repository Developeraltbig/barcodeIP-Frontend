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
    startProcess: builder.mutation({
      query: (data) => ({
        url: '/api/v1/user/Dashboard/start-processing',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['startProcessing']
    }),

    fetchAllProjects: builder.query({
      query: ({ page = 1, limit = 10, search = "", status = "all" } = {}) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);

        if (search && search.trim()) {
          params.append("search", search.trim());
        }

        if (status && status !== "all") {
          params.append("status", status);
        }

        return {
          url: `/api/v1/projects/fetchallproject?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["AllProjects"],
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

    createAnalystConnections: builder.mutation({
      // Accept an object containing the ID and the actual data body
      query: ({ projectId, body }) => ({
        url: `/api/v1/user/Dashboard/support-analyst/${projectId}`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['AnalystConnection']
    }),

    // --- Support Analysts ---
    getSupportAnalysts: builder.query({
      query: () => ({
        url: '/api/v1/user/Dashboard/projects-with-analyst-status',
        method: 'GET',
      }),
      providesTags: ['SupportAnalysts']
    }),
    createOrder: builder.mutation({
      query: ({ amount }) => ({
        url: `/api/v1/user/Dashboard/create-order`,
        method: 'POST',
        body: { amount: amount }
      }),
      invalidatesTags: ['VerifyPaymentOrder']
    }),

    verifyPaymentOrder: builder.mutation({
      query: ({ orderID }) => ({
        url: `/api/v1/user/Dashboard/verify-order`,
        method: 'POST',
        body: { orderID: orderID }
      }),
      invalidatesTags: ['VerifyPaymentOrder']
    }),

    getWalletDetails: builder.query({
      query: () => ({
        url: '/api/v1/user/Dashboard/getWallet',
        method: 'GET',
      }),
      providesTags: ['GetWalletDetails']
    }),

    getTransactionDetails: builder.query({
      // Accept an argument object containing page and limit configurations
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/api/v1/user/Dashboard/getPaginatedTransactions?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      // Re-runs the query automatically if the tags are invalidated somewhere else
      providesTags: ['GetTransactionDetails']
    }),

  }),

  overrideExisting: false
});

// Exporting both standard and Lazy versions
export const {
  useGetLatestContentQuery,
  useCreateProjectMutation,
  useStartProcessMutation,
  useCreateAnalystConnectionsMutation,
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

  useCreateOrderMutation,
  useVerifyPaymentOrderMutation,
  useGetWalletDetailsQuery,
  useGetTransactionDetailsQuery
} = userApi;
