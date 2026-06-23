import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'

const POPULAR = ['iPhone 15', 'Samsung 65 inch TV', 'boAt earbuds', 'Realme 12 Pro', 'Laptop under 50000']

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
          🔍 <span className="text-primary">CompareGo</span>
          <br />Smart Product Comparison
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-lg mx-auto">
          Compare prices, ratings, and specifications in real-time across Amazon & Flipkart.
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-2xl">
        <SearchBar onSearch={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)} />
      </div>

      {/* Popular searches */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <span className="text-sm text-slate-400 dark:text-slate-500 mr-1">Popular:</span>
        {POPULAR.map((term) => (
          <button
            key={term}
            onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
            className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Feature pills */}
      <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
        <span>✅ Real-time prices</span>
        <span>✅ Best Deal highlighted</span>
        <span>✅ Save favourites</span>
        <span>✅ Amazon + Flipkart</span>
      </div>
    </main>
  )
}
