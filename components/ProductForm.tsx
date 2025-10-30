'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProductFormData } from '@/types/product'

const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  price: z.coerce
    .number()
    .positive('Price must be a positive number'),
  image: z
    .string()
    .url('Must be a valid URL')
    .min(1, 'Image URL is required'),
})

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void
  initialData?: ProductFormData
  isLoading?: boolean
}


export function ProductForm({
  onSubmit,
  initialData,
  isLoading = false,
}: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.image || ''
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImagePreview(url)
  }

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data)
    if (!initialData) {
      reset()
      setImagePreview('')
    }
  }

  return (
    <div>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-foreground opacity-60 hover:opacity-100 transition-opacity mb-6 font-medium text-sm"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="card p-8 max-w-2xl">
        <h1 className="text-2xl font-semibold mb-1">
          {initialData ? 'Edit Product' : 'Create Product'}
        </h1>
        <p className="text-foreground opacity-60 mb-8 text-sm">
          {initialData
            ? 'Update the product details'
            : 'Add a new product to your collection'}
        </p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="form-group">
            <label
              htmlFor="title"
              className="form-label"
            >
              Product Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a title"
              {...register('title')}
              className={`${errors.title ? 'border-destructive' : ''}`}
            />
            {errors.title && (
              <p className="form-error">{errors.title.message}</p>
            )}
          </div>

          <div className="form-group">
            <label
              htmlFor="description"
              className="form-label"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your product"
              rows={5}
              {...register('description')}
              className={`${errors.description ? 'border-destructive' : ''}`}
            />
            {errors.description && (
              <p className="form-error">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label
              htmlFor="price"
              className="form-label"
            >
              Price (USD)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register('price', { valueAsNumber: true })}
              className={`${errors.price ? 'border-destructive' : ''}`}
            />
            {errors.price && (
              <p className="form-error">{errors.price.message}</p>
            )}
          </div>

          <div className="form-group">
            <label
              htmlFor="image"
              className="form-label"
            >
              Image URL
            </label>
            <input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register('image')}
              onChange={handleImageChange}
              className={`${errors.image ? 'border-destructive' : ''}`}
            />
            {errors.image && (
              <p className="form-error">{errors.image.message}</p>
            )}

            {imagePreview && (
              <div className="mt-4">
                <p className="form-label">
                  Preview
                </p>
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-secondary">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src =
                        'https://via.placeholder.com/400x200?text=Invalid+Image'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1"
            >
              {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
            </button>
            <Link
              href="/products"
              className="btn-secondary px-6 py-3 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
