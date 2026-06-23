import { useSearchParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useProductSearch } from '../hooks/useProductSearch'
import ProductCard from '../components/product/ProductCard'
import SortToggle from '../components/product/SortToggle'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import SearchBar from '../components/common/SearchBar'
import { useNavigate } from 'react-router-dom'

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const navigate = useNavigate()
  const [sort, setSort] = useState('price')
  const [selectedProducts, setSelectedProducts] = useState([])

  const { data, isLoading, isError } = useProductSearch(query)

  const sorted = data?.results
    ? [...data.results].sort((a, b) =>
        sort === 'price'
          ? a.lowestPrice - b.lowestPrice
          : b.highestRating - a.highestRating
      )
    : []

  const [visibleCount, setVisibleCount] = useState(12)
  const sentinelRef = useRef(null)

  useEffect(() => {
    setVisibleCount(12)
  }, [query, sort])

  useEffect(() => {
    if (isLoading || isError || sorted.length <= visibleCount) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, sorted.length))
        }
      },
      { rootMargin: '200px' }
    )

    const currentSentinel = sentinelRef.current
    if (currentSentinel) {
      observer.observe(currentSentinel)
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
      }
    }
  }, [isLoading, isError, sorted.length, visibleCount])

  const visibleProducts = sorted.slice(0, visibleCount)

  const handleToggleSelect = (product) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id))
    } else {
      if (selectedProducts.length >= 4) {
        alert('You can select up to 4 products to compare simultaneously.')
        return
      }
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const handleCompareNow = () => {
    if (selectedProducts.length < 2) return
    navigate('/compare/multi', { state: { products: selectedProducts } })
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pb-24 relative">
      {/* Re-search bar on mobile */}
      <div className="mb-6 sm:hidden">
        <SearchBar
          initialValue={query}
          onSearch={(q) => {
            setSelectedProducts([])
            navigate(`/search?q=${encodeURIComponent(q)}`)
          }}
        />
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Results for <span className="text-primary">"{query}"</span>
          </h2>
          {data && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {data.results.length} product{data.results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
        {!isLoading && sorted.length > 0 && (
          <SortToggle sort={sort} onSort={setSort} />
        )}
      </div>

      {isLoading && <LoadingSpinner message="Comparing prices across Amazon & Flipkart…" />}
      {isError && <ErrorMessage message="Could not fetch results. Please try again." />}

      {!isLoading && !isError && sorted.length === 0 && (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-medium">No results found for "{query}"</p>
          <p className="text-sm mt-1">Try a different search term.</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProducts.some((p) => p.id === product.id)}
            onToggleSelect={() => handleToggleSelect(product)}
          />
        ))}
      </div>

      {/* Sentinel element for infinite scroll */}
      {sorted.length > visibleCount && (
        <div ref={sentinelRef} className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
          <p className="text-xs text-slate-500 dark:text-slate-400">Loading more products…</p>
        </div>
      )}

      {/* Floating comparison drawer */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl px-6 py-4 flex items-center justify-between gap-6 z-50 w-[90vw] max-w-2xl animate-fade-in-up">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Compare Products
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Selected {selectedProducts.length} of 4
            </span>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={handleCompareNow}
              disabled={selectedProducts.length < 2}
              className="btn-primary py-2 px-5 rounded-full text-xs font-semibold shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setSelectedProducts([])}
              className="btn-outline py-2 px-4 rounded-full text-xs font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
