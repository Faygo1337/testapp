"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Trash2, Edit2, Eye } from "lucide-react"
import type { Product } from "@/types/product"
import { truncateText, formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  isSelected?: boolean
  onToggleFavorite: () => void
  onDelete: () => void
  onToggleSelect?: (id: string) => void
}


export function ProductCard({
  product,
  isSelected = false,
  onToggleFavorite,
  onDelete,
  onToggleSelect,
}: ProductCardProps) {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className={`relative transition-all duration-300 ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {onToggleSelect && (
        <div className="absolute top-4 left-4 z-20">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation()
              onToggleSelect(product.id)
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 cursor-pointer accent-primary rounded"
            aria-label={`Select ${product.title}`}
          />
        </div>
      )}

      {product.isFavorite && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-red-500 text-white p-1.5! rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <Heart size={13} fill="currentColor" />
            Liked
          </div>
        </div>
      )}

      <div className="product-card-modern group h-full flex flex-col">
        <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-secondary to-secondary/50">
          <Image
            src={
              !imageError
                ? product.image ||
                  `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(product.title || "product")}`
                : "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={product.title}
            fill
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${isHovering ? "scale-110" : "scale-100"}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            priority={false}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-secondary animate-pulse"></div>
          )}

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <Link href={`/products/${product.id}`}>
            <button
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-100 ${
                isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Eye size={16} />
              View Details
            </button>
          </Link>
        </div>

        <div className="flex flex-col flex-1 p-5 gap-4">
          {product.category && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/70 bg-primary/10 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-bold text-base md:text-lg leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200 px-3!">
              {product.title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed opacity-80 px-3!">
            {truncateText(product.description, 100)}
          </p>

          <div className="pt-4 border-t border-border/40">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-muted-foreground font-medium">Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-primary">{formatPrice(product.price)}</span>
                  <span className="text-xs text-muted-foreground font-medium">USD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleFavorite()
              }}
              className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 font-medium border backdrop-blur-sm ${
                product.isFavorite
                  ? "bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500/30"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:border-border/60"
              }`}
              aria-label="Toggle favorite"
              title={product.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={18} fill={product.isFavorite ? "currentColor" : "none"} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                router.push(`/products/${product.id}/edit`)
              }}
              className="flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/80 hover:border-border/60 backdrop-blur-sm"
              aria-label="Edit product"
              title="Edit product"
            >
              <Edit2 size={18} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDelete()
              }}
              className="flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 font-medium border border-border text-muted-foreground hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/50 backdrop-blur-sm"
              aria-label="Delete product"
              title="Delete product"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
