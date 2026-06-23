import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import GoogleLoginBtn from '../components/auth/GoogleLoginBtn'
import { useThemeStore } from '../store/themeStore'

export default function AuthPage() {
  const { isLoggedIn } = useAuthStore()
  const { dark } = useThemeStore()
  const [mode, setMode] = useState('login') // 'login' | 'register'

  if (isLoggedIn) return <Navigate to="/" replace />

  return (
    <main className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm">
        <div className="card p-8 flex flex-col gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="CompareGo Logo" className="h-20 w-auto object-contain" />
          </div>

          {/* Google login */}
          <GoogleLoginBtn />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400 dark:text-slate-500">or</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Email/password form */}
          {mode === 'login' ? (
            <LoginForm onSwitch={() => setMode('register')} />
          ) : (
            <RegisterForm onSwitch={() => setMode('login')} />
          )}
        </div>
      </div>
    </main>
  )
}
