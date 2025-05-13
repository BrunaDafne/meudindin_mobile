// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './slices/transactionsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    transaction: transactionsReducer,
    user: userReducer
  }
})

// Tipos para usar no app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
