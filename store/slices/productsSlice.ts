import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, ProductsState } from '@/types/product'

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedIds: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.unshift(action.payload)
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const product = state.items.find(item => item.id === action.payload)
      if (product) {
        product.isFavorite = !product.isFavorite
      }
    },
    toggleSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.selectedIds.indexOf(id)
      if (index === -1) {
        state.selectedIds.push(id)
      } else {
        state.selectedIds.splice(index, 1)
      }
    },
    selectAll: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload
    },
    clearSelection: (state) => {
      state.selectedIds = []
    },
    deleteSelected: (state) => {
      state.items = state.items.filter(item => !state.selectedIds.includes(item.id))
      state.selectedIds = []
    },
  },
})

export const {
  setProducts,
  setLoading,
  setError,
  addProduct,
  deleteProduct,
  updateProduct,
  toggleFavorite,
  toggleSelection,
  selectAll,
  clearSelection,
  deleteSelected,
} = productsSlice.actions

export default productsSlice.reducer
