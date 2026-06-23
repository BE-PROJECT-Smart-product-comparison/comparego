import axios from './axiosInstance'

export const authApi = {
  register: async ({ name, email, password }) => {
    const { data } = await axios.post('/api/v1/auth/register', { name, email, password })
    return data // { token, refreshToken, expiresIn, user }
  },

  login: async ({ email, password }) => {
    const { data } = await axios.post('/api/v1/auth/login', { email, password })
    return data
  },

  googleLogin: async (googleToken) => {
    const { data } = await axios.post('/api/v1/auth/google', { token: googleToken })
    return data
  },

  refreshToken: async (refreshToken) => {
    const { data } = await axios.post('/api/v1/auth/refresh', { refreshToken })
    return data
  },
}
