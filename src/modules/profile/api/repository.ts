import { createApi } from '@reduxjs/toolkit/query/react'
import { solutionBaseQuery } from '../../../core/api/solution-base-query'
import { RootState } from '../../../store/store'
import { setUser } from '../../auth/service/slice'
import { FollowUserInDTO } from './dto/follow-user.in'
import { GetProfileInDTO } from './dto/get-profile.in'
import { UpdateUserInDTO } from './dto/update-user.in'
import { UpdateUserOutInDTO } from './dto/update-user.out'
import { replaceCachedProfile } from './utils'

export interface ProfileParams {
  username: string
}

interface UpdateProfileParams {
  avatar: string
  username: string
  bio: string
  email: string
  newPassword: string
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: solutionBaseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}`,
      }),
    }),

    followUser: builder.mutation<FollowUserInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}/follow`,
        method: 'post',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedProfile(
          getState,
          queryFulfilled,
          dispatch,
          profileApi
        )
      },
    }),
    
    unFollowUser: builder.mutation<FollowUserInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}/follow`,
        method: 'delete',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedProfile(
          getState,
          queryFulfilled,
          dispatch,
          profileApi
        )
      },
    }),

    updateUser: builder.mutation<UpdateUserInDTO, UpdateProfileParams>({
      query: ({ email, username, bio, avatar, newPassword }) => {
        const data: UpdateUserOutInDTO = {
          user: {
            email,
            username,
            bio,
            image: avatar,
          },
        }

        if (newPassword) {
          data.user.password = newPassword
        }

        return {
          url: '/user',
          method: 'put',
          data,
        }
      },
      onQueryStarted: async (
        { email, username, bio, avatar },
        { dispatch, queryFulfilled, getState }
      ) => {
        const state = getState() as RootState
        await queryFulfilled

        dispatch(
          setUser({
            token: state.auth.user!.token,
            email,
            username,
            bio,
            image: avatar,
          })
        )
      },
    }),
  }),
})

export const {
  useGetProfileQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useUpdateUserMutation,
} = profileApi
