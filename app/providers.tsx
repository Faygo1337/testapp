'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { Navigation } from '@/components/Navigation'
import { ThemeProvider } from '@/components/ThemeProvider'
import { setProducts } from '@/store/slices/productsSlice'
import {
  setSearchTerm,
  setShowFavoritesOnly,
  setPriceRange,
  setSelectedCategory,
  setSortBy,
  setCurrentPage,
  setItemsPerPage,
} from '@/store/slices/filterSlice'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const productsJson = localStorage.getItem('producthub_products')
      if (productsJson) {
        const { items } = JSON.parse(productsJson)
        store.dispatch(setProducts(items))
      }

      const filterJson = localStorage.getItem('producthub_filters')
      if (filterJson) {
        const filter = JSON.parse(filterJson)
        store.dispatch(setSearchTerm(filter.searchTerm || ''))
        store.dispatch(setShowFavoritesOnly(filter.showFavoritesOnly || false))
        store.dispatch(setPriceRange(filter.priceRange || [0, 10000]))
        store.dispatch(setSelectedCategory(filter.selectedCategory || null))
        store.dispatch(setSortBy(filter.sortBy || 'date-new'))
        store.dispatch(setCurrentPage(filter.currentPage || 1))
        store.dispatch(setItemsPerPage(filter.itemsPerPage || 12))
      }
    } catch (error) {
      console.error('Failed to load persisted state:', error)
    }
  }, [])

  return (
    <ThemeProvider>
      <Provider store={store}>
        <Navigation />
        {children}
      </Provider>
    </ThemeProvider>
  )
}
