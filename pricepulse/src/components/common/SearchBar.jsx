import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ compact = false, initialValue = '', onSearch }) {
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

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <div className={`relative flex w-full ${compact ? '' : 'max-w-2xl mx-auto'}`}>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={compact ? 'Search products…' : 'Search for a product (e.g. "iPhone 15", "Samsung TV")'}
          className={`
            w-full pl-9 pr-4 border border-slate-300 dark:border-slate-600 rounded-l-lg
            bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary
            transition ${compact ? 'py-1.5 text-sm' : 'py-3 text-base'}
          `}
        />
        <button
          type="submit"
          className={`bg-primary hover:bg-primary-dark text-white font-semibold rounded-r-lg transition-colors shrink-0
            ${compact ? 'px-3 py-1.5 text-sm' : 'px-6 py-3 text-base'}`}
        >
          Search
        </button>
      </div>
    </form>
  )
}
