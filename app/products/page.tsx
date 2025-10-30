'use client'

import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setProducts,
  deleteProduct,
  toggleFavorite,
  setLoading,
  setError,
  toggleSelection,
  selectAll,
  clearSelection,
  deleteSelected,
} from '@/store/slices/productsSlice'
import { fetchProducts } from '@/lib/api'
import { FilterBar } from '@/components/FilterBar'
import { ProductsGrid } from '@/components/ProductsGrid'
import { Pagination } from '@/components/Pagination'
import { EmptyState } from '@/components/EmptyState'

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const { items: products, loading, error, selectedIds } = useAppSelector(
    (state) => state.products
  )
  const {
    searchTerm,
    showFavoritesOnly,
    priceRange,
    selectedCategory,
    sortBy,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.filter)

  useEffect(() => {
    const loadProducts = async () => {
      const hasLocalStorageData = typeof window !== 'undefined' && localStorage.getItem('producthub_products')

      if (products.length === 0 && !hasLocalStorageData) {
        dispatch(setLoading(true))
        try {
          const data = await fetchProducts()
          dispatch(setProducts(data))
        } catch (err) {
          dispatch(
            setError(
              err instanceof Error ? err.message : 'Failed to fetch products'
            )
          )
        }
      }
    }

    loadProducts()
  }, [dispatch, products.length])

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (showFavoritesOnly) {
      result = result.filter((product) => product.isFavorite)
    }
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'date-new':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case 'date-old':
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        break
    }

    return result
  }, [products, searchTerm, showFavoritesOnly, priceRange, selectedCategory, sortBy])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id))
  }

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id))
  }

  const handleToggleSelect = (id: string) => {
    dispatch(toggleSelection(id))
  }

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      dispatch(clearSelection())
    } else {
      dispatch(selectAll(paginatedProducts.map((p) => p.id)))
    }
  }

  const handleDeleteSelected = () => {
    if (confirm(`Delete ${selectedIds.length} selected products?`)) {
      dispatch(deleteSelected())
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          title="No Products Yet"
          description="Start by creating your first product or loading products from our catalog."
          showCreateLink={true}
        />
      </div>
    )
  }

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Products</h1>
        <p className="text-foreground opacity-60 text-sm">
          {filteredAndSortedProducts.length} of {products.length} products
        </p>
      </div>

      <FilterBar />

      {filteredAndSortedProducts.length === 0 ? (
        <EmptyState
          title="No Products Match"
          description="Try adjusting your search or filters."
          showCreateLink={false}
        />
      ) : (
        <>
          {paginatedProducts.length > 0 && (
            <div className="card p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === paginatedProducts.length && selectedIds.length > 0}
                  onChange={handleSelectAll}
                  className="w-5 h-5 cursor-pointer"
                  aria-label="Select all products on this page"
                />
                <span className="text-sm font-medium w-32">
                  {selectedIds.length > 0
                    ? `${selectedIds.length} selected`
                    : 'Select all'}
                </span>
              </div>

              {selectedIds.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="btn-secondary px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                >
                  Delete {selectedIds.length}
                </button>
              )}
            </div>
          )}

          <ProductsGrid
            products={paginatedProducts}
            selectedIds={selectedIds}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteProduct}
            onToggleSelect={handleToggleSelect}
          />
          <Pagination totalItems={filteredAndSortedProducts.length} />
        </>
      )}
    </div>
  )
}
