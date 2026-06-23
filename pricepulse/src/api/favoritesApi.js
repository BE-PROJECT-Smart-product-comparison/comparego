import axios from './axiosInstance'

export const favoritesApi = {
  getAll: async () => {
    const { data } = await axios.get('/api/v1/comparisons')
    return data
  },

  save: async (product) => {
    const { data } = await axios.post('/api/v1/comparisons', {
      productName: product.title,
      category: 'Electronics',
      description: 'Saved for comparison'
    })
    return data
  },

  remove: async (productId) => {
    await axios.delete(`/api/v1/comparisons/${productId}`)
  },
}
