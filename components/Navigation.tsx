'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { lazy, Suspense } from 'react'

const ThemeToggleComponent = lazy(() =>
  import('./ThemeProvider').then((mod) => ({
    default: mod.ThemeToggle,
  }))
)


export function Navigation() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            ProductHub
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/products"
              className={`text-sm transition-opacity duration-300 ${
                isActive('/products')
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              Products
            </Link>
            <Link
              href="/create-product"
              className={`text-sm transition-opacity duration-300 ${
                isActive('/create-product')
                  ? 'opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              Create
            </Link>
            <Suspense fallback={<div className="w-10 h-10" />}>
              <ThemeToggleComponent />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  )
}
