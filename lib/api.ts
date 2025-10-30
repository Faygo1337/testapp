import axios from 'axios'
import { Product } from '@/types/product'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

/**
 * Fetch products from external API
 * Using JSONPlaceholder posts as product data
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get('/posts?_limit=12')
    const products: Product[] = response.data.map((post: any) => ({
      id: `api-${post.id}`,
      title: post.title,
      description: post.body,
      image: `https://picsum.photos/300/200?random=${post.id}`,
      price: Math.floor(Math.random() * 100) + 10,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      source: 'api' as const,
    }))
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

/**
 * Validate that a URL is accessible
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}
