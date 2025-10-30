"use client"

import { Heart, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  setShowFavoritesOnly,
  setSearchTerm,
  setPriceRange,
  setSelectedCategory,
  setSortBy,
  resetFilters,
} from "@/store/slices/filterSlice"

export function FilterBar() {
  const dispatch = useAppDispatch()
  const { searchTerm, showFavoritesOnly, priceRange, selectedCategory, sortBy } = useAppSelector(
    (state) => state.filter,
  )

  const { items: products } = useAppSelector((state) => state.products)

  const categories = Array.from(new Set(products.map((p: any) => p.category).filter(Boolean))) as string[]

  const maxPrice = Math.max(...products.map((p: any) => p.price), 1000)

  const hasActiveFilters =
    searchTerm || showFavoritesOnly || priceRange[0] > 0 || priceRange[1] < maxPrice || selectedCategory

  return (
    <div className="space-y-4 mb-8">
      <div className="card p-5 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={() => dispatch(setShowFavoritesOnly(!showFavoritesOnly))}
          className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            showFavoritesOnly ? "btn-primary" : "btn-secondary"
          }`}
          aria-label="Toggle favorites filter"
        >
          <Heart size={16} className="inline mr-2" fill={showFavoritesOnly ? "currentColor" : "none"} />
          {showFavoritesOnly ? "Favorites" : "All"}
        </button>

        <select
          value={sortBy}
          onChange={(e) =>
            dispatch(setSortBy(e.target.value as "name" | "price-asc" | "price-desc" | "date-new" | "date-old"))
          }
          className="px-4 py-2 rounded-lg font-medium"
        >
          <option value="date-new">Newest</option>
          <option value="date-old">Oldest</option>
          <option value="name">Name (A-Z)</option>
          <option value="price-asc">Price (Low-High)</option>
          <option value="price-desc">Price (High-Low)</option>
        </select>
      </div>

      <div className="card p-5 flex flex-col sm:flex-row gap-6 flex-wrap items-between mt-8 mb-8!">
        {/* Price Range Filter */}
        <div className="flex-1 min-w-[280px]">
          <label className="block text-sm font-medium text-foreground mb-3">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="flex gap-3">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) =>
                dispatch(setPriceRange([Number(e.target.value), Math.max(Number(e.target.value), priceRange[1])]))
              }
              className="flex-1"
            />
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                dispatch(setPriceRange([Math.min(priceRange[0], Number(e.target.value)), Number(e.target.value)]))
              }
              className="flex-1"
            />
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex-1 min-w-[220px]">
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-3">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory || ""}
              onChange={(e) => dispatch(setSelectedCategory(e.target.value || null))}
              className="w-full px-4 py-2 rounded-lg font-medium"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="btn-secondary px-5 py-2 flex items-center gap-2 whitespace-nowrap"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>
    </div>
  )
}
