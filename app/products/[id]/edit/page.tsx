'use client'

import { useRouter, useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateProduct } from '@/store/slices/productsSlice'
import { ProductForm } from '@/components/ProductForm'
import { ProductFormData } from '@/types/product'
import { Product } from '@/types/product'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()

  const productId = typeof params.id === 'string' ? params.id : ''
  const product = useAppSelector((state) =>
    state.products.items.find((item: Product) => item.id === productId)
  )

  if (!product) {
    return (
      <div className="container py-8">
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2 className="empty-state-title">Product Not Found</h2>
          <p className="empty-state-description">
            The product you're trying to edit doesn't exist.
          </p>
          <a href="/products" className="btn-primary">
            Back to Products
          </a>
        </div>
      </div>
    )
  }

  const handleSubmit = (data: ProductFormData) => {
    const updatedProduct = {
      ...product,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    dispatch(updateProduct(updatedProduct))
    router.push(`/products/${product.id}`)
  }

  return (
    <div className="container py-8">
      <ProductForm
        onSubmit={handleSubmit}
        initialData={{
          title: product.title,
          description: product.description,
          price: product.price,
          image: product.image,
        }}
      />
    </div>
  )
}
