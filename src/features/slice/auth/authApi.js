import { baseApi } from '../../../services/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Auth']
    }),

    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: data
      })
    }),
    refreshToken: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/refresh-token',
        method: 'POST',
        body: data
      })
    }),
    // checkAuth: builder.query({
    //   query: () => '/api/v1/auth/admin-user/check',
    //   providesTags: ['Auth']
    // }),

    logout: builder.query({
      query: () => '/api/v1/auth/logout',
      providesTags: ['Auth']
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/forgot-password',
        method: 'POST',
        body: data
      })
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/reset-password',
        method: 'POST',
        body: data
      })
    })

  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useCheckAuthQuery,
  useLazyLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
