import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PlatformRow from '../components/product/PlatformRow'
import SortToggle from '../components/product/SortToggle'
import SaveButton from '../components/product/SaveButton'
import { formatPrice } from '../utils/formatPrice'

export default function ComparisonPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [sort, setSort] = useState('price')

  // Product is passed via router state from SearchResultsPage
  const product = location.state?.product

  // If no state (e.g. direct URL access), send back to home
  if (!product) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] gap-4 px-4">
        <span className="text-5xl">🔍</span>
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          No product data found.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
          Please search for a product first and click Compare.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary mt-2"
        >
          Go to Search
        </button>
      </main>
    )
  }

  const sorted = [...(product.listings || [])].sort((a, b) =>
    sort === 'price' ? a.price - b.price : (b.rating ?? 0) - (a.rating ?? 0)
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 dark:text-slate-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <button
          onClick={() => navigate(-1)}
          className="hover:text-primary"
        >
          Results
        </button>
        <span className="mx-2">/</span>
        <span className="text-slate-600 dark:text-slate-300 line-clamp-1">
          {product.title}
        </span>
      </nav>

      {/* Product title + save */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug flex-1">
          {product.title}
        </h1>
        <SaveButton product={product} />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Lowest Price</p>
          <p className="text-xl font-bold text-success">
            {formatPrice(product.lowestPrice)}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Platforms</p>
          <p className="text-xl font-bold text-slate-800 dark:text-white">
            {product.listings?.length || 0}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Top Rating</p>
          <p className="text-xl font-bold text-slate-800 dark:text-white">
            {product.highestRating ? `⭐ ${product.highestRating.toFixed(1)}` : '—'}
          </p>
        </div>
      </div>

      {/* Sort toggle */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="font-semibold text-slate-700 dark:text-slate-300">
          Compare across platforms
        </h2>
        {sorted.length > 1 && <SortToggle sort={sort} onSort={setSort} />}
      </div>

      {/* Platform rows */}
      {sorted.length === 0 ? (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">😕</p>
          <p>No platform listings available for this product.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((listing) => (
            <PlatformRow key={listing.platform} listing={listing} />
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-8">
        Prices fetched in real-time via SerpAPI. Click "View on [Platform]" to buy.
      </p>
    </main>
  )
}