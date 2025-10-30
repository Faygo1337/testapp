'use client'

import { useRouter, useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteProduct, toggleFavorite } from '@/store/slices/productsSlice'
import { ProductDetail } from '@/components/ProductDetail'
import { Product } from '@/types/product'

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()

  const productId = typeof params.id === 'string' ? params.id : ''
  const product = useAppSelector((state) =>
    state.products.items.find((item: Product) => item.id === productId)
  )

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(productId))
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId))
      router.push('/products')
    }
  }

  return (
    <div className="container py-8">
      <ProductDetail
        product={product || null}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
      />
    </div>
  )
}
