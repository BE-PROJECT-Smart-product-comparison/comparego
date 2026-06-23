import { useEffect } from 'react'
import { useFavoritesStore } from '../../store/favoritesStore'
import { formatPrice } from '../../utils/formatPrice'
import { Link } from 'react-router-dom'

export default function FavoritesList() {
  const { favorites, loading, fetchFavorites, removeFavorite } = useFavoritesStore()

  useEffect(() => {
    fetchFavorites()
  }, [])

  if (loading) {
    return <p className="text-slate-500 text-center py-10">Loading saved products…</p>
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 dark:text-slate-500">
        <p className="text-5xl mb-4">♡</p>
        <p className="text-lg font-medium">No saved products yet</p>
        <p className="text-sm mt-1">Search for a product and click ♡ to save it here.</p>
        <Link to="/" className="btn-primary inline-block mt-6 text-sm">
          Start Searching
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((fav) => (
        <div key={fav.productId} className="card p-4 flex flex-col gap-3">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug line-clamp-2">
            {fav.productTitle}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {formatPrice(fav.lowestPrice)}
            </span>
            <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
              {fav.bestPlatform === 'AMAZON' ? '📦 Amazon' : 
               fav.bestPlatform === 'FLIPKART' ? '🛒 Flipkart' : 
               fav.bestPlatform === 'CROMA' ? '📺 Croma' : 
               fav.bestPlatform === 'RELIANCE' ? '🔌 Reliance' : 
               fav.bestPlatform === 'VIJAY_SALES' ? '🛍️ Vijay Sales' : 
               fav.bestPlatform === 'JIOMART' ? '🌾 JioMart' :
               fav.bestPlatform === 'MYNTRA' ? '👗 Myntra' :
               fav.bestPlatform === 'AJIO' ? '👟 AJIO' :
               fav.bestPlatform === 'TATA_CLIQ' ? '💎 Tata CLiQ' :
               `🏪 ${fav.bestPlatform}`}
            </span>
          </div>
          <div className="flex gap-2 mt-auto">
            <a
              href={fav.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary text-sm text-center"
            >
              View Deal →
            </a>
            <button
              onClick={() => removeFavorite(fav.productId)}
              className="px-3 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm transition-colors"
            >
              ♥
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
