import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useNavigate } from 'react-router-dom'

export default function SaveButton({ product }) {
  const { isLoggedIn } = useAuthStore()
  const { isFavorited, addFavorite, removeFavorite } = useFavoritesStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const favorited = isFavorited(product.id)

  const handleClick = async () => {
    if (!isLoggedIn) {
      navigate('/auth')
      return
    }
    setLoading(true)
    try {
      if (favorited) {
        await removeFavorite(product.id)
      } else {
        await addFavorite({
          productId: product.id,
          productTitle: product.title,
          lowestPrice: product.lowestPrice,
          bestPlatform: product.listings?.find((l) => l.isBestDeal)?.platform || '',
          productUrl: product.listings?.[0]?.url || '',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors
        ${favorited
          ? 'border-red-300 text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-900/20'
          : 'border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
        }`}
    >
      {loading ? '…' : favorited ? '♥' : '♡'}
    </button>
  )
}
