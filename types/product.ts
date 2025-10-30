export interface Product {
  id: string
  title: string
  description: string
  image: string
  price: number
  isFavorite: boolean
  createdAt: string
  category?: string
  source?: 'api' | 'user'
}

export interface ProductFormData {
  title: string
  description: string
  image: string
  price: number
  category?: string
}

export interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
  selectedIds: string[]
}

export interface FilterState {
  searchTerm: string
  showFavoritesOnly: boolean
  priceRange: [number, number]
  selectedCategory: string | null
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'date-new' | 'date-old'
  currentPage: number
  itemsPerPage: number
}
