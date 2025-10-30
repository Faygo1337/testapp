import { Middleware } from '@reduxjs/toolkit'

const PRODUCTS_STORAGE_KEY = 'producthub_products'
const FILTER_STORAGE_KEY = 'producthub_filters'

/**
 * Middleware to persist products state to localStorage
 */
export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action)
    const state = store.getState()

    // Save products to localStorage
    try {
      localStorage.setItem(
        PRODUCTS_STORAGE_KEY,
        JSON.stringify({
          items: state.products.items,
          selectedIds: state.products.selectedIds,
        })
      )
    } catch (error) {
      console.error('Failed to save products to localStorage:', error)
    }

    // Save filter state to localStorage
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(state.filter))
    } catch (error) {
      console.error('Failed to save filter state to localStorage:', error)
    }

    return result
  }
