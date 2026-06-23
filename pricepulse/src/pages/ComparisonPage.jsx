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

  // Check if we are in multi-product comparison mode
  const isMultiMode = id === 'multi'
  const multiProducts = location.state?.products || []
  const singleProduct = location.state?.product

  // ── RENDER MULTI-PRODUCT COMPARISON ────────────────────────────────────────
  if (isMultiMode) {
    if (multiProducts.length === 0) {
      return (
        <main className="flex flex-col items-center justify-center min-h-[70vh] gap-4 px-4">
          <span className="text-5xl">📊</span>
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            No products selected for comparison.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary mt-2">
            Go to Search
          </button>
        </main>
      )
    }

    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 dark:text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <button onClick={() => navigate(-1)} className="hover:text-primary">Results</button>
          <span className="mx-2">/</span>
          <span className="text-slate-600 dark:text-slate-300 font-medium">Side-by-Side Comparison</span>
        </nav>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Product Comparison Matrix ({multiProducts.length} Products)
        </h1>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl shadow-md bg-white dark:bg-slate-900">
          <table className="w-full min-w-[700px] border-collapse table-fixed text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="w-1/5 p-4 text-left font-semibold text-slate-500 dark:text-slate-400">Feature</th>
                {multiProducts.map((p, idx) => (
                  <th key={p.id} className="p-4 text-left font-bold text-slate-800 dark:text-white border-l border-slate-200 dark:border-slate-700">
                    Product #{idx + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-800 dark:text-slate-200">
              {/* Image Row */}
              <tr>
                <td className="p-4 font-medium text-slate-500 dark:text-slate-400">Preview</td>
                {multiProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/10">
                    {p.thumbnail ? (
                      <div className="h-28 flex items-center justify-center p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/50">
                        <img src={p.thumbnail} alt={p.title} className="max-h-full max-w-full object-contain" />
                      </div>
                    ) : (
                      <div className="h-28 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400">
                        No Image
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Title Row */}
              <tr>
                <td className="p-4 font-medium text-slate-500 dark:text-slate-400">Product Name</td>
                {multiProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-700 font-semibold leading-snug">
                    {p.title}
                  </td>
                ))}
              </tr>

              {/* Lowest Price Row */}
              <tr>
                <td className="p-4 font-medium text-slate-500 dark:text-slate-400">Lowest Price</td>
                {multiProducts.map((p) => {
                  const minPriceAcrossAll = Math.min(...multiProducts.map(x => x.lowestPrice))
                  const isAbsoluteCheapest = p.lowestPrice === minPriceAcrossAll
                  return (
                    <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-700">
                      <span className={`text-xl font-bold ${isAbsoluteCheapest ? 'text-success' : 'text-slate-900 dark:text-white'}`}>
                        {formatPrice(p.lowestPrice)}
                      </span>
                      {isAbsoluteCheapest && (
                        <span className="block text-[10px] text-success font-semibold mt-0.5">
                          ⭐ Best Value
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>

              {/* Platform Listings Row */}
              <tr>
                <td className="p-4 font-medium text-slate-500 dark:text-slate-400">Merchant Availability</td>
                {multiProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-700 space-y-1.5">
                    {p.listings?.map((l) => (
                      <a
                        key={l.platform}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:bg-blue-50/10 transition-colors bg-slate-50/50 dark:bg-slate-800/20"
                      >
                        <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                          {l.platform === 'AMAZON' ? '📦 Amazon' : 
                           l.platform === 'FLIPKART' ? '🛒 Flipkart' : 
                           l.platform === 'CROMA' ? '📺 Croma' : 
                           l.platform === 'RELIANCE' ? '🔌 Reliance' : 
                           l.platform === 'VIJAY_SALES' ? '🛍️ Vijay Sales' : 
                           `🏪 ${l.platform}`}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {formatPrice(l.price)}
                        </span>
                      </a>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr>
                <td className="p-4 font-medium text-slate-500 dark:text-slate-400">Rating & Reviews</td>
                {multiProducts.map((p) => {
                  const rating = p.highestRating
                  const bestListing = p.listings?.find(l => l.rating != null)
                  return (
                    <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-700">
                      {rating ? (
                        <div>
                          <span className="text-sm font-bold text-slate-800 dark:text-white">
                            ⭐ {rating.toFixed(1)} / 5.0
                          </span>
                          {bestListing?.reviewCount && (
                            <span className="block text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                              ({bestListing.reviewCount} verified reviews)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>

              {/* Specifications Row */}
              <tr>
                <td className="p-4 font-medium text-slate-500 dark:text-slate-400">Specifications</td>
                {multiProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-700 align-top">
                    {p.specifications && p.specifications.length > 0 ? (
                      <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 dark:text-slate-300">
                        {p.specifications.map((spec, sIdx) => (
                          <li key={sIdx} className="line-clamp-2 leading-relaxed">
                            {spec}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Actions Row */}
              <tr>
                <td className="p-4 font-medium text-slate-500 dark:text-slate-400">Bookmark</td>
                {multiProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-slate-200 dark:border-slate-700 text-center">
                    <div className="inline-block scale-90">
                      <SaveButton product={p} />
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    )
  }

  // ── RENDER SINGLE-PRODUCT MULTI-PLATFORM COMPARISON ────────────────────────
  const product = singleProduct

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
        <button onClick={() => navigate('/')} className="btn-primary mt-2">
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
        <button onClick={() => navigate(-1)} className="hover:text-primary">Results</button>
        <span className="mx-2">/</span>
        <span className="text-slate-600 dark:text-slate-300 line-clamp-1">
          {product.title}
        </span>
      </nav>

      {/* Product Card Header */}
      <div className="card p-6 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 mb-6 flex flex-col md:flex-row gap-6">
        {product.thumbnail && (
          <div className="w-full md:w-44 h-44 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden p-3 border border-slate-100 dark:border-slate-700/50">
            <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain" />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {product.title}
            </h1>
            <SaveButton product={product} />
          </div>

          {/* Dynamic Specifications list */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                Key Specifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.specifications.map((spec, sIdx) => (
                  <span key={sIdx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
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