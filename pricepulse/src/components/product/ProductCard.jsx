import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import BestDealBadge from './BestDealBadge'
import SaveButton from './SaveButton'

export default function ProductCard({ product, isSelected, onToggleSelect }) {
  const { id, title, lowestPrice, highestRating, listings = [], thumbnail } = product
  const bestListing = listings.find((l) => l.isBestDeal) || listings[0]

  return (
    <div
      onClick={(e) => {
        // Don't toggle selection if clicking buttons or links
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return
        onToggleSelect()
      }}
      className={`card p-4 hover:shadow-lg transition-all flex flex-col gap-3 relative cursor-pointer border ${
        isSelected
          ? 'ring-2 ring-primary border-primary bg-blue-50/20 dark:bg-blue-900/10'
          : 'border-slate-200 dark:border-slate-700'
      }`}
    >
      {/* Checkbox */}
      <div className="absolute top-3 right-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
        />
      </div>

      {/* Product Image */}
      {thumbnail && (
        <div className="w-full h-32 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg overflow-hidden p-2 mb-1 border border-slate-100 dark:border-slate-700/50">
          <img
            src={thumbnail}
            alt={title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug line-clamp-2 pr-6">
        {title}
      </h3>

      {/* Price + badge row */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {formatPrice(lowestPrice)}
          </span>
          <span className="text-xs text-slate-400 ml-1.5">lowest</span>
        </div>
        {listings.some((l) => l.isBestDeal) && <BestDealBadge />}
      </div>

      {/* Platform pills */}
      <div className="flex gap-1.5 flex-wrap">
        {listings.map((l) => (
          <span
            key={l.platform}
            className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium"
          >
            {l.platform === 'AMAZON' ? '📦 Amazon' : 
             l.platform === 'FLIPKART' ? '🛒 Flipkart' : 
             l.platform === 'CROMA' ? '📺 Croma' : 
             l.platform === 'RELIANCE' ? '🔌 Reliance' : 
             l.platform === 'VIJAY_SALES' ? '🛍️ Vijay Sales' : 
             `🏪 ${l.platform}`}
            {' · '}
            {formatPrice(l.price)}
          </span>
        ))}
      </div>

      {/* Rating */}
      {highestRating && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          ⭐ {highestRating.toFixed(1)} top rating
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
        <Link
          to={`/compare/${id}`}
          state={{ product }}
          className="flex-1 btn-primary py-1.5 text-xs text-center font-medium rounded-lg"
        >
          Compare Platforms →
        </Link>
        <SaveButton product={product} />
      </div>
    </div>
  )
}