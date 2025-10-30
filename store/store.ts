import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import filterReducer from './slices/filterSlice'
import { localStorageMiddleware } from './middleware/localStorage'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
