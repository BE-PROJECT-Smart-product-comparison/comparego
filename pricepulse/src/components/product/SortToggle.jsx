export default function SortToggle({ sort, onSort }) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden text-sm font-medium">
      <button
        onClick={() => onSort('price')}
        className={`px-4 py-2 transition-colors ${
          sort === 'price'
            ? 'bg-primary text-white'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
        }`}
      >
        💰 Lowest Price
      </button>
      <button
        onClick={() => onSort('rating')}
        className={`px-4 py-2 transition-colors border-l border-slate-200 dark:border-slate-700 ${
          sort === 'rating'
            ? 'bg-primary text-white'
            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
        }`}
      >
        ⭐ Top Rated
      </button>
    </div>
  )
}
