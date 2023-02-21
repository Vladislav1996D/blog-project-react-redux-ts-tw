import { createApi } from '@reduxjs/toolkit/query/react'
import { solutionBaseQuery } from '../../../core/api/solution-base-query'
import { CHANNEL_PAGE_SIZE } from '../consts'
import { ArticleCommentsInDTo } from './dto/article-comments.in'
import { CreateArticleInDTO } from './dto/create-article.in'
import { CreateArticleOutDTO } from './dto/create-article.out'
import { EditArticleInDTO } from './dto/edit-article.in'
import { EditArticleOutDTO } from './dto/edit-article.out'
import { FavoriteArticleInDTO } from './dto/favorite-article.in'
import { ChannelArticle } from './dto/global-channel.in'
import { NewCommentInDto } from './dto/new-comment.in'
import { NewCommentOutDTO } from './dto/new-comment.out'
import { PopularTagsInDTO } from './dto/popular-tags.in'
import { SingleArticleInDTO } from './dto/single-article.in'
import {
  addNewCommentToCache,
  removeCommentFromCache,
  replaceCachedArticle,
  transformResponse,
} from './utils'

interface BaseChannelParams {
  page: number
}

export interface GlobalChannelParams extends BaseChannelParams {
  tag: string | null
  isPersonalChannel: boolean
}

interface ProfileChannelParams extends BaseChannelParams {
  author: string
  isFavorite?: boolean
}

export interface ChannelData {
  articles: ChannelArticle[]
  articlesCount: number
}

interface SingleArticleParams {
  slug: string
}

interface favoriteArticleParams {
  slug: string
}

interface CreateArticleParams {
  title: string
  description: string
  body: string
  tagList?: string
  tags: string
}

interface EditArticleParams extends CreateArticleParams {
  slug: string
}
interface DeleteArticleParams {
  slug: string
}

interface CreateCommentParams {
  articleSlug: string
  comment: string
}

interface DeleteCommentParams {
  id: number
  articleSlug: string
}

export const channelApi = createApi({
  reducerPath: 'channelApi',
  baseQuery: solutionBaseQuery,
  tagTypes: ['Article', 'Articles'],
  endpoints: (builder) => ({
    // queries
    getGlobalChannel: builder.query<ChannelData, GlobalChannelParams>({
      keepUnusedDataFor: 1,
      query: ({ page, tag, isPersonalChannel }) => ({
        url: isPersonalChannel ? '/articles/feed' : '/articles',
        params: {
          limit: CHANNEL_PAGE_SIZE,
          offset: page * CHANNEL_PAGE_SIZE,
          tag,
        },
      }),
    }),

    getProfileChannel: builder.query<ChannelData, ProfileChannelParams>({
      keepUnusedDataFor: 1,
      query: ({ page, author, isFavorite = false }) => ({
        url: '/articles',
        params: {
          limit: CHANNEL_PAGE_SIZE,
          offset: page * CHANNEL_PAGE_SIZE,
          author: isFavorite ? undefined : author,
          favorited: !isFavorite ? undefined : author,
        },
      }),
      transformResponse,
    }),

    getPopularTags: builder.query<PopularTagsInDTO, any>({
      query: () => ({
        url: '/tags',
      }),
    }),

    getSingleArticle: builder.query<SingleArticleInDTO, SingleArticleParams>({
      keepUnusedDataFor: 1,
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
      }),
    }),

    getCommentsForArticle: builder.query<
      ArticleCommentsInDTo,
      SingleArticleParams
    >({
      keepUnusedDataFor: 1,
      query: ({ slug }) => ({
        url: `/articles/${slug}/comments`,
      }),
    }),
    // ===========================
    // mutations
    favoriteArticle: builder.mutation<
      FavoriteArticleInDTO,
      favoriteArticleParams
    >({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'post',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(
          getState,
          queryFulfilled,
          dispatch,
          channelApi
        )
      },
    }),

    unfavoriteArticle: builder.mutation<
      FavoriteArticleInDTO,
      favoriteArticleParams
    >({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'delete',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(
          getState,
          queryFulfilled,
          dispatch,
          channelApi
        )
      },
    }),

    createArticle: builder.mutation<CreateArticleInDTO, CreateArticleParams>({
      query: ({ title, description, body, tags }) => {
        const data: CreateArticleOutDTO = {
          article: {
            title,
            description,
            body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        }

        return {
          url: '/articles',
          method: 'post',
          data,
        }
      },
    }),

    editArticle: builder.mutation<EditArticleInDTO, EditArticleParams>({
      query: ({ title, description, body, tags, slug }) => {
        const data: EditArticleOutDTO = {
          article: {
            title,
            description,
            body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        }

        return {
          url: `/articles/${slug}`,
          method: 'put',
          data,
        }
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(
          getState,
          queryFulfilled,
          dispatch,
          channelApi
        )
      },
    }),

    deleteArticle: builder.mutation<any, DeleteArticleParams>({
      query: ({ slug }) => {
        return {
          url: `/articles/${slug}`,
          method: 'delete',
        }
      },
    }),

    createComment: builder.mutation<NewCommentInDto, CreateCommentParams>({
      query: ({ articleSlug, comment }) => {
        const data: NewCommentOutDTO = {
          comment: {
            body: comment,
          },
        }

        return {
          url: `/articles/${articleSlug}/comments`,
          method: 'post',
          data,
        }
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await addNewCommentToCache(getState, queryFulfilled, dispatch)
      },
    }),

    deleteComment: builder.mutation<any, DeleteCommentParams>({
      query: ({ id, articleSlug }) => {
        return {
          url: `/articles/${articleSlug}/comments/${id}`,
          method: 'delete',
        }
      },
      onQueryStarted: async (
        { id },
        { dispatch, queryFulfilled, getState }
      ) => {
        await removeCommentFromCache(getState, queryFulfilled, dispatch, { id })
      },
    }),
  }),
})

export const {
  useGetGlobalChannelQuery,
  useGetProfileChannelQuery,
  useGetPopularTagsQuery,
  useGetSingleArticleQuery,
  useGetCommentsForArticleQuery,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = channelApi
