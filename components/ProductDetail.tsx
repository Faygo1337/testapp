"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Trash2, ArrowLeft, Edit2 } from "lucide-react"
import type { Product } from "@/types/product"
import { formatPrice, formatDate } from "@/lib/utils"

interface ProductDetailProps {
  product: Product | null
  onToggleFavorite: () => void
  onDelete: () => void
}


export function ProductDetail({ product, onToggleFavorite, onDelete }: ProductDetailProps) {
  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📦</div>
        <h2 className="empty-state-title">Product Not Found</h2>
        <p className="empty-state-description">The product you're looking for doesn't exist.</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>
    )
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

      <div className="card p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="relative w-full h-96 rounded-lg overflow-hidden bg-secondary">
              <Image
                src={
                  product.image ||
                  `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(product.title || "product")}`
                }
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold mb-3">{product.title}</h1>

            <p className="text-2xl font-semibold text-primary mb-6">{formatPrice(product.price)}</p>

            <div className="mb-6 pb-6 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground opacity-60 mb-2 uppercase tracking-wide">
                Description
              </h2>
              <p className="text-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8 text-sm text-foreground opacity-60">
              <p>Created {formatDate(product.createdAt)}</p>
              <p className="mt-1">{product.source === "api" ? "From Catalog" : "User Created"}</p>
            </div>

            <div className="flex gap-2 mt-auto flex-wrap">
              <button
                onClick={onToggleFavorite}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all min-w-[120px] ${
                  product.isFavorite ? "btn-primary" : "btn-secondary"
                }`}
              >
                <Heart size={18} fill={product.isFavorite ? "currentColor" : "none"} />
                {product.isFavorite ? "Liked" : "Like"}
              </button>

              <Link
                href={`/products/${product.id}/edit`}
                className="btn-secondary px-6 py-3 flex items-center justify-center gap-2 rounded-lg"
              >
                <Edit2 size={18} />
                Edit
              </Link>

              <button
                onClick={onDelete}
                className="btn-secondary px-6 py-3 flex items-center justify-center gap-2 opacity-60 hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
