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
    }),

    // Also add a mutation for updating the profile if you want "Save Changes" to work
    updateProfile: builder.mutation({
      query: (data) => ({
        url: 'api/v1/user/Dashboard/update/userProfile',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User'],
      
    }),

    updateImage: builder.mutation({
      query: (data) => ({
        url: '/api/v1/user/Dashboard/update-profile-image',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User'],
      
    }),

    changePassword: builder.mutation({
      query: (credentials) => ({
        url: 'api/v1/user/Dashboard/change-password',
        method: 'PATCH',
        body: credentials
      })
    }),

    deleteAccount: builder.mutation({
      query: () => ({
        url: '/api/v1/user/Dashboard/deleteUser',
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    }),

    // GET: Fetch User Details by ID
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/auth/get-userDetails/${id}`,
        method: 'GET'
      }),
      providesTags: ['User'] // Mark this data with the 'User' tag
    })
  })
});

export const {
  useGetProfileQuery, // Export this
  useUpdateProfileMutation,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useCheckAuthQuery,
  useLazyLogoutQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
  useChangePasswordMutation,
  useUpdateImageMutation,
   useGetUserDetailsQuery,
} = authApi;

















// import { baseApi } from '../../../services/baseApi';
// import { setUser } from './authSlice';

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//     // LOGIN
//     login: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/auth/login',
//         method: 'POST',
//         body: data
//       }),
//       invalidatesTags: ['Auth']
//     }),

//     // REGISTER
//     register: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/auth/register',
//         method: 'POST',
//         body: data
//       })
//     }),

//     // REFRESH TOKEN
//     refreshToken: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/auth/refresh-token',
//         method: 'POST',
//         body: data
//       })
//     }),

//     // LOGOUT
//     logout: builder.query({
//       query: () => '/api/v1/auth/logout',
//       providesTags: ['Auth']
//     }),

//     // FORGOT PASSWORD
//     forgotPassword: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/auth/forgot-password',
//         method: 'POST',
//         body: data
//       })
//     }),

//     // RESET PASSWORD
//     resetPassword: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/auth/reset-password',
//         method: 'POST',
//         body: data
//       })
//     }),

//     // UPDATE PROFILE
//     updateProfile: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/user/Dashboard/update/userProfile',
//         method: 'PATCH',
//         body: data
//       }),
//       invalidatesTags: ['User'],

//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {

//           const { data } = await queryFulfilled;

//           const updatedUser =
//             data?.userDetail ||
//             data?.data?.userDetail ||
//             data?.data ||
//             data;

//           if (updatedUser) {
//             dispatch(setUser(updatedUser));
//           }

//         } catch (err) {
//           console.error("Profile sync failed:", err);
//         }
//       },
//     }),

//     // UPDATE PROFILE IMAGE
//     updateImage: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/user/Dashboard/update-profile-image',
//         method: 'PATCH',
//         body: data
//       }),
//       invalidatesTags: ['User'],

//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {

//           const { data } = await queryFulfilled;

//           const updatedUser =
//             data?.userDetail ||
//             data?.data?.userDetail ||
//             data?.data ||
//             data;

//           if (updatedUser) {
//             dispatch(setUser(updatedUser));
//           }

//         } catch (err) {
//           console.error("Image sync failed:", err);
//         }
//       },
//     }),

//     // CHANGE PASSWORD
//     changePassword: builder.mutation({
//       query: (credentials) => ({
//         url: '/api/v1/user/Dashboard/change-password',
//         method: 'PATCH',
//         body: credentials
//       })
//     }),

//     // DELETE ACCOUNT
//     deleteAccount: builder.mutation({
//       query: () => ({
//         url: '/api/v1/user/Dashboard/deleteUser',
//         method: 'DELETE'
//       }),
//       invalidatesTags: ['User']
//     }),

//     // GET USER DETAILS
//     getUserDetails: builder.query({
//       query: (id) => ({
//         url: `/api/v1/auth/get-userDetails/${id}`,
//         method: 'GET'
//       }),
//       providesTags: ['User']
//     }),

//   })
// });

// export const {

//   useLoginMutation,
//   useRegisterMutation,
//   useRefreshTokenMutation,
//   useLazyLogoutQuery,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,
//   useDeleteAccountMutation,
//   useChangePasswordMutation,
//   useUpdateProfileMutation,
//   useUpdateImageMutation,
//   useGetUserDetailsQuery,

// } = authApi;