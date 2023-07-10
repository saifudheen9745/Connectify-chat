import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import rerenderReducer from './slices/rerenderChatListSlice'
import currentChatReducer from './slices/currentChatSlice' ;
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
}

const combinedReducer = combineReducers({
  userReducer,
  rerenderReducer,
  currentChatReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)


export const store = configureStore({
  reducer: {
    persistedReducer
  },
  middleware:[logger]
})