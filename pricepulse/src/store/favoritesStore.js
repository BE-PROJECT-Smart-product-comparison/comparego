import { create } from 'zustand'
import { favoritesApi } from '../api/favoritesApi'

export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  loading: false,

  fetchFavorites: async () => {
    set({ loading: true })
    try {
      const data = await favoritesApi.getAll()
      const mapped = data.map((p) => ({
        productId: p.id,
        productTitle: p.productName,
        lowestPrice: p.lowestPrice || 0,
        bestPlatform: p.bestPlatform || 'AMAZON',
        productUrl: `/search?q=${encodeURIComponent(p.productName)}`
      }))
      set({ favorites: mapped })
    } finally {
      set({ loading: false })
    }
  },

  addFavorite: async (product) => {
    const response = await favoritesApi.save(product)
    const newFav = {
      productId: response.id,
      productTitle: response.productName,
      lowestPrice: product.lowestPrice,
      bestPlatform: product.listings?.[0]?.platform || 'AMAZON',
      productUrl: `/search?q=${encodeURIComponent(response.productName)}`
    }
    set((state) => ({ favorites: [...state.favorites, newFav] }))
  },

  removeFavorite: async (productId) => {
    await favoritesApi.remove(productId)
    set((state) => ({
      favorites: state.favorites.filter((f) => f.productId !== productId && String(f.productId) !== String(productId)),
    }))
  },

  isFavorited: (productId) =>
    get().favorites.some((f) => f.productId === productId || String(f.productId) === String(productId)),
}))
