import Link from "next/link"

export default function Home() {
  return (
    <div className="hero">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-balance">The complete platform to manage your products</h1>
        <p className="text-pretty text-lg">
          Your team's toolkit to organize, track, and showcase your product catalog. Securely manage inventory, pricing,
          and product details with ease.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mt-8">
          <Link href="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
          <Link href="/create-product" className="btn-secondary inline-block">
            Create Product
          </Link>
        </div>
      </div>
    </div>
  )
}
