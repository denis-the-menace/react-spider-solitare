import { configureStore } from '@reduxjs/toolkit'
import cardReducer from './slices/cardSlice'

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
