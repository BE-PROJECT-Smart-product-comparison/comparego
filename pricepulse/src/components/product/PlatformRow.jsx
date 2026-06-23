import BestDealBadge from './BestDealBadge'
import { formatPrice } from '../../utils/formatPrice'

const PLATFORM_LOGOS = {
  AMAZON: { label: 'Amazon', bg: 'bg-orange-50 dark:bg-orange-950/20', color: 'text-orange-600 dark:text-orange-400', icon: '📦' },
  FLIPKART: { label: 'Flipkart', bg: 'bg-blue-50 dark:bg-blue-950/20', color: 'text-blue-600 dark:text-blue-400', icon: '🛒' },
  CROMA: { label: 'Croma', bg: 'bg-emerald-50 dark:bg-emerald-950/20', color: 'text-emerald-600 dark:text-emerald-400', icon: '📺' },
  VIJAY_SALES: { label: 'Vijay Sales', bg: 'bg-red-50 dark:bg-red-950/20', color: 'text-red-600 dark:text-red-400', icon: '🛍️' },
  RELIANCE: { label: 'Reliance Digital', bg: 'bg-red-50 dark:bg-red-950/20', color: 'text-red-500 dark:text-red-400', icon: '🔌' },
  JIOMART: { label: 'JioMart', bg: 'bg-indigo-50 dark:bg-indigo-950/20', color: 'text-indigo-600 dark:text-indigo-400', icon: '🌾' },
  MYNTRA: { label: 'Myntra', bg: 'bg-pink-50 dark:bg-pink-950/20', color: 'text-pink-600 dark:text-pink-400', icon: '👗' },
  AJIO: { label: 'AJIO', bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-slate-700 dark:text-slate-300', icon: '👟' },
  TATA_CLIQ: { label: 'Tata CLiQ', bg: 'bg-rose-50 dark:bg-rose-950/20', color: 'text-rose-600 dark:text-rose-400', icon: '💎' },
}

export default function PlatformRow({ listing }) {
  const { platform, price, originalPrice, discountPercent, rating, reviewCount, url, isBestDeal } = listing
  const meta = PLATFORM_LOGOS[platform] || { label: platform, bg: 'bg-slate-50', color: 'text-slate-600', icon: '🏪' }

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all
      ${isBestDeal
        ? 'border-success/40 bg-success-light dark:bg-green-900/20'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
      }`}
    >
      {/* Platform badge */}
      <div className={`flex flex-col items-center justify-center w-20 h-14 rounded-lg shrink-0 ${meta.bg}`}>
        <span className="text-xl">{meta.icon}</span>
        <span className={`text-xs font-semibold mt-0.5 ${meta.color}`}>{meta.label}</span>
      </div>

      {/* Price info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {formatPrice(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-xs font-semibold text-success bg-success-light dark:bg-green-900/30 px-1.5 py-0.5 rounded">
              -{discountPercent}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          {rating && (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              ⭐ {rating.toFixed(1)}
              {reviewCount && (
                <span className="ml-1 text-xs text-slate-400">
                  ({reviewCount.toLocaleString('en-IN')} reviews)
                </span>
              )}
            </span>
          )}
          {isBestDeal && <BestDealBadge />}
        </div>
      </div>

      {/* CTA */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors
          ${isBestDeal
            ? 'bg-success hover:bg-green-700 text-white'
            : 'bg-primary hover:bg-primary-dark text-white'
          }`}
      >
        View on {meta.label} →
      </a>
    </div>
  )
}
