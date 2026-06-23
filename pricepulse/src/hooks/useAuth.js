import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/authApi'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const { login, logout, isLoggedIn, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async (credentials) => {
    const data = await authApi.login(credentials)
    login(data)
    navigate('/')
  }

  const handleRegister = async (credentials) => {
    const data = await authApi.register(credentials)
    login(data)
    navigate('/')
  }

  const handleGoogleLogin = async (googleToken) => {
    const data = await authApi.googleLogin(googleToken)
    login(data)
    navigate('/')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return { isLoggedIn, user, handleLogin, handleRegister, handleGoogleLogin, handleLogout }
}
