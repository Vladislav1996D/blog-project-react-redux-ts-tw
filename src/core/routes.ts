import { FC } from 'react'
import { SignInPage } from '../modules/auth/pages/sign-in.page'
import { SignUpPage } from '../modules/auth/pages/sign-up.page'
import { ArticlePage } from '../modules/channel/pages/article.page'
import { EditorPage } from '../modules/channel/pages/editor.page'
import { GlobalChannelPage } from '../modules/channel/pages/global-channel.page'
import { ProfilePage } from '../modules/profile/pages/profile.page'
import { SettingsPage } from '../modules/profile/pages/settings.page'

interface RouteItem {
  path: string
  Element: FC
  private?: boolean
}

export const routes: Record<string, RouteItem> = {
  globalChannel: {
    path: '/',
    Element: GlobalChannelPage,
  },
  personalChannel: {
    path: '/personal-channel',
    Element: GlobalChannelPage,
    private: true,
  },
  profile: {
    path: '/@:profile',
    Element: ProfilePage,
  },
  profileFavorites: {
    path: '/@:profile/favorites',
    Element: ProfilePage,
  },
  singleArticle: {
    path: '/article/:slug',
    Element: ArticlePage,
  },
  signIn: {
    path: '/sign-in',
    Element: SignInPage,
  },
  signUp: {
    path: '/sign-up',
    Element: SignUpPage,
  },
  settings: {
    path: '/settings',
    Element: SettingsPage,
    private: true,
  },
  createArticle: {
    path: '/editor',
    Element: EditorPage,
    private: true,
  },
  EditArticle: {
    path: '/editor/:slug',
    Element: EditorPage,
    private: true,
  },
}
