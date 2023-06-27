import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    persistedReducer
  },
  middleware:[logger]
})