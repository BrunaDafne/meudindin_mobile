// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import transactionsReducer from './slices/transactionsSlice'
import userReducer from './slices/userSlice'
import walletsReducer from './slices/walletSlice'

// Combina todos os reducers
const rootReducer = combineReducers({
  transaction: transactionsReducer,
  user: userReducer,
  wallets: walletsReducer,
})

// Configuração da persistência
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['transaction', 'user', 'wallets'], // quais reducers você quer persistir
}

// Cria um reducer com persistência
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Cria a store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // necessário para evitar erros com redux-persist
    }),
})

// Exporta o persistor
export const persistor = persistStore(store)

// Tipos para usar no app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
