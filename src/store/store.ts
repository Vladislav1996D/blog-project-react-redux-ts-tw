import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authApi } from '../modules/auth/api/repository'
import { authSlise } from '../modules/auth/service/slice'
import { channelApi } from '../modules/channel/api/repository'
import { profileApi } from '../modules/profile/api/repository'

const persistConfig = {
  key: 'solution',
  storage,
  whiteList: [authSlise.name],
}

const persistentReduser = persistReducer(
  persistConfig,
  combineReducers({
    [channelApi.reducerPath]: channelApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authSlise.name]: authSlise.reducer,
    [authApi.reducerPath]: authApi.reducer,
  })
)

export const store = configureStore({
  reducer: persistentReduser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      channelApi.middleware,
      profileApi.middleware,
      authApi.middleware,
    ]),
})

export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
