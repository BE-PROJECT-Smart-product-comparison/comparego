import axios from './axiosInstance'

export const productApi = {
  // Search products across platforms
  search: async (query) => {
    const { data } = await axios.get('/api/v1/products/search', {
      params: { q: query },
    })
    return data
  },

  // Get a single product by ID
  getById: async (id) => {
    const { data } = await axios.get(`/api/v1/products/${id}`)
    return data
  },
}
