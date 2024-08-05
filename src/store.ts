import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from './slices/cardSlice'
import gameReducer from './slices/gameSlice'

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    game: gameReducer,
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
