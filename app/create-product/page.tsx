'use client'

import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { addProduct } from '@/store/slices/productsSlice'
import { ProductForm } from '@/components/ProductForm'
import { ProductFormData } from '@/types/product'
import { generateId } from '@/lib/utils'

export default function CreateProductPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = (data: ProductFormData) => {
    const newProduct = {
      id: generateId(),
      ...data,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      source: 'user' as const,
    }

    dispatch(addProduct(newProduct))
    router.push('/products')
  }

  return (
    <div className="container py-8">
      <ProductForm onSubmit={handleSubmit} />
    </div>
  )
}
