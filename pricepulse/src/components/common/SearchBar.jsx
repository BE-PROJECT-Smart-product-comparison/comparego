import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ variant = 'default', compact = false, initialValue = '', onSearch }) {
  const [query, setQuery] = useState(initialValue)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    if (onSearch) {
      onSearch(trimmed)
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  const isCompact = variant === 'compact' || compact
  const isHome = variant === 'home'

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <div className={`relative flex w-full ${isHome ? 'max-w-xl mx-auto shadow-sm' : isCompact ? '' : 'max-w-2xl mx-auto'}`}>
        {!isHome && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            🔍
          </span>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isHome
              ? 'Search for any product'
              : isCompact
              ? 'Search products…'
              : 'Search for a product (e.g. "iPhone 15", "Samsung TV")'
          }
          className={`
            w-full pr-12 border border-slate-300 dark:border-slate-600
            bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
            transition
            ${isHome ? 'pl-4 rounded-md py-3 text-base' : 'pl-9 rounded-l-lg'}
            ${isCompact ? 'py-1.5 text-sm' : 'py-3 text-base'}
          `}
        />
        {isHome ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5">
            {/* Red microphone icon */}
            <button type="button" aria-label="Voice search" className="text-red-500 hover:text-red-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            </button>
            {/* Search icon */}
            <button type="submit" aria-label="Search" className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className={`bg-primary hover:bg-primary-dark text-white font-semibold rounded-r-lg transition-colors shrink-0
              ${isCompact ? 'px-3 py-1.5 text-sm' : 'px-6 py-3 text-base'}`}
          >
            Search
          </button>
        )}
      </div>
    </form>
  )
}
