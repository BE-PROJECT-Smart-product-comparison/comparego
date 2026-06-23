import axios from './axiosInstance'

export const historyApi = {
  getAll: async () => {
    const { data } = await axios.get('/api/v1/history')
    return data
  },

  clear: async () => {
    await axios.delete('/api/v1/history')
  }
}
