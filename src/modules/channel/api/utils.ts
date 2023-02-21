import { Drafted } from 'immer/dist/internal'
import { RootState } from '../../../store/store'
import { Profile } from '../../profile/api/dto/follow-user.in'
import { ArticleCommentsInDTo } from './dto/article-comments.in'
import { ChannelArticle, GlobalChannelInDTO } from './dto/global-channel.in'
import { SingleArticleInDTO } from './dto/single-article.in'
import { channelApi, ChannelData } from './repository'

export const transformResponse = (responce: GlobalChannelInDTO) => {
  return {
    articles: responce.articles || [],
    articlesCount: responce.articlesCount || 0,
  }
}

const updateChannel = <Q>(
  channelKey: string,
  data: { article: ChannelArticle },
  channelKeys: string[],
  state: RootState,
  dispatch: any,
  channelApi: any
) => {
  for (
    let i = 0, key = channelKeys[i], queryItem = state.channelApi.queries[key];
    i < channelKeys.length;
    i++, key = channelKeys[i], queryItem = state.channelApi.queries[key]
  ) {
    if (!key.startsWith(channelKey)) {
      continue
    }

    dispatch(
      channelApi.util.updateQueryData(
        channelKey,
        queryItem!.originalArgs as Q,
        (draft: Drafted<ChannelData> | Drafted<SingleArticleInDTO>) => {
          if ('articles' in draft) {
            const updateId = draft.articles.findIndex(
              (article) => article.slug === data.article.slug
            )

            if (updateId >= 0) {
              draft.articles[updateId] = data.article
            }
          } else {
            draft.article.favorited = data.article.favorited
            draft.article.favoritesCount = data.article.favoritesCount
            draft.article.tagList = data.article.tagList
          }
        }
      )
    )
  }
}

export const replaceCachedArticle = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  channelApi: any
) => {
  const state = getState() as RootState

  try {
    const { data } = await queryFulfilled
    const channelKeys = Object.keys(state.channelApi.queries)

    updateChannel(
      'getGlobalChannel',
      data,
      channelKeys,
      state,
      dispatch,
      channelApi
    )
    updateChannel(
      'getProfileChannel',
      data,
      channelKeys,
      state,
      dispatch,
      channelApi
    )
    updateChannel(
      'getSingleArticle',
      data,
      channelKeys,
      state,
      dispatch,
      channelApi
    )
  } catch (e) {}
}

const updateProfile = <Q>(
  channelKey: string,
  data: { profile: Profile },
  channelKeys: string[],
  state: RootState,
  dispatch: any
) => {
  for (
    let i = 0, key = channelKeys[i], queryItem = state.channelApi.queries[key];
    i < channelKeys.length;
    i++, key = channelKeys[i], queryItem = state.channelApi.queries[key]
  ) {
    if (!key.startsWith(channelKey)) {
      continue
    }

    dispatch(
      channelApi.util.updateQueryData(
        channelKey as any,
        queryItem!.originalArgs as Q,
        (draft) => {
          ;(draft as Drafted<SingleArticleInDTO>).article.author.following =
            data.profile.following
        }
      )
    )
  }
}

export const replacesCachedProfileInArticle = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any
) => {
  const state = getState() as RootState

  try {
    const { data } = await queryFulfilled
    const channelKeys = Object.keys(state.channelApi.queries)

    updateProfile('getSingleArticle', data, channelKeys, state, dispatch)
  } catch (e) {}
}

export const addNewCommentToCache = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any
) => {
  const state = getState() as RootState

  try {
    const { data } = await queryFulfilled
    const channelKeys = Object.keys(state.channelApi.queries)
    const channelKey = 'getCommentsForArticle'

    for (
      let i = 0,
        key = channelKeys[i],
        queryItem = state.channelApi.queries[key];
      i < channelKeys.length;
      i++, key = channelKeys[i], queryItem = state.channelApi.queries[key]
    ) {
      if (!key.startsWith(channelKey)) {
        continue
      }

      dispatch(
        channelApi.util.updateQueryData(
          channelKey as any,
          queryItem!.originalArgs,
          (draft) => {
            const original = draft as Drafted<ArticleCommentsInDTo>

            original.comments.unshift(data.comment)
          }
        )
      )
    }
  } catch (e) {}
}

interface RemoveFromCacheOptionsMeta {
  id: number
}

export const removeCommentFromCache = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  meta: RemoveFromCacheOptionsMeta
) => {
  const state = getState() as RootState

  try {
    await queryFulfilled
    const channelKeys = Object.keys(state.channelApi.queries)
    const channelKey = 'getCommentsForArticle'

    for (
      let i = 0,
        key = channelKeys[i],
        queryItem = state.channelApi.queries[key];
      i < channelKeys.length;
      i++, key = channelKeys[i], queryItem = state.channelApi.queries[key]
    ) {
      if (!key.startsWith(channelKey)) {
        continue
      }

      dispatch(
        channelApi.util.updateQueryData(
          channelKey as any,
          queryItem!.originalArgs,
          (draft) => {
            const original = draft as Drafted<ArticleCommentsInDTo>

            original.comments = original.comments.filter((comment) => comment.id !== meta.id)
          }
        )
      )
    }
  } catch (e) {}
}
