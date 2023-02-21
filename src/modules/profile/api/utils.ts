import { RootState } from '../../../store/store'
import { Drafted } from 'immer/dist/internal'
import { Profile } from './dto/follow-user.in'
import { GetProfileInDTO } from './dto/get-profile.in'
import { replacesCachedProfileInArticle } from '../../channel/api/utils'

const updateProfile = <Q>(
  channelKey: string,
  data: { profile: Profile },
  channelKeys: string[],
  state: RootState,
  dispatch: any,
  profileApi: any
) => {
  for (
    let i = 0, key = channelKeys[i], queryItem = state.profileApi.queries[key];
    i < channelKeys.length;
    i++, key = channelKeys[i], queryItem = state.profileApi.queries[key]
  ) {
    if (!key.startsWith(channelKey)) {
      continue
    }

    const profileToUpdate = state.profileApi.queries[key]
      ?.data as GetProfileInDTO

    if (profileToUpdate.profile.username !== data.profile.username) {
      continue
    }

    dispatch(
      profileApi.util.updateQueryData(
        channelKey,
        queryItem!.originalArgs as Q,
        (draft: Drafted<GetProfileInDTO>) => {
          draft.profile.following = data.profile.following
        }
      )
    )
  }
}

export const replaceCachedProfile = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  profileApi: any
) => {
  const state = getState() as RootState
  try {
    const { data } = await queryFulfilled
    const channelKeys = Object.keys(state.profileApi.queries)

    updateProfile('getProfile', data, channelKeys, state, dispatch, profileApi)
    replacesCachedProfileInArticle(getState, queryFulfilled, dispatch)
  } catch (e) {}
}

