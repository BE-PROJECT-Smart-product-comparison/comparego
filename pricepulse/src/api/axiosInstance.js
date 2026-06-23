import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
})

// Attach JWT token to every request if present
instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers['Bypass-Tunnel-Reminder'] = 'true'
  return config
})

// Handle 401 — clear auth and redirect to login
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

export default instance
