import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterState } from '@/types/product'

const initialState: FilterState = {
  searchTerm: '',
  showFavoritesOnly: false,
  priceRange: [0, 10000],
  selectedCategory: null,
  sortBy: 'date-new',
  currentPage: 1,
  itemsPerPage: 12,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setShowFavoritesOnly: (state, action: PayloadAction<boolean>) => {
      state.showFavoritesOnly = action.payload
      state.currentPage = 1
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
      state.currentPage = 1
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
      state.currentPage = 1
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    resetFilters: (state) => {
      state.searchTerm = ''
      state.showFavoritesOnly = false
      state.priceRange = [0, 10000]
      state.selectedCategory = null
      state.sortBy = 'date-new'
      state.currentPage = 1
    },
  },
})

export const {
  setSearchTerm,
  setShowFavoritesOnly,
  setPriceRange,
  setSelectedCategory,
  setSortBy,
  setCurrentPage,
  setItemsPerPage,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
