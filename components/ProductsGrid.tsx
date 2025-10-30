'use client'

import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { EmptyState } from './EmptyState'

interface ProductsGridProps {
  products: Product[]
  selectedIds?: string[]
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  onToggleSelect?: (id: string) => void
}

/**
 * ProductsGrid component - displays products in a grid layout with selection
 */
export function ProductsGrid({
  products,
  selectedIds = [],
  onToggleFavorite,
  onDelete,
  onToggleSelect,
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        description="Try adjusting your filters or search term. No products match your criteria."
        showCreateLink={true}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedIds.includes(product.id)}
          onToggleFavorite={() => onToggleFavorite(product.id)}
          onDelete={() => onDelete(product.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  )
}
