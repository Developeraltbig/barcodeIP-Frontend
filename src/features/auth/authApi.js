import { baseApi } from '../../services/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/admin-user/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Auth']
    }),

    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/admin-user/register',
        method: 'POST',
        body: data
      })
    }),

    checkAuth: builder.query({
      query: () => '/api/v1/auth/admin-user/check',
      providesTags: ['Auth']
    }),

    logout: builder.query({
      query: () => '/api/v1/auth/admin-user/logout',
      providesTags: ['Auth']
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/admin-user/forgot-password',
        method: 'POST',
        body: data
      })
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/admin-user/reset-password',
        method: 'POST',
        body: data
      })
    })

  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCheckAuthQuery,
  useLazyLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
