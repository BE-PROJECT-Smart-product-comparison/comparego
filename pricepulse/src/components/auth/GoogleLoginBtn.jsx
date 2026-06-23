import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

export default function GoogleLoginBtn() {
  const { handleGoogleLogin } = useAuth()
  const [error, setError] = useState('')

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('')
      try {
        await handleGoogleLogin(tokenResponse.access_token)
      } catch {
        setError('Google login failed. Please try again.')
      }
    },
    onError: () => setError('Google login was cancelled or failed.'),
  })

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => login()}
        className="flex items-center justify-center gap-3 w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium py-2 rounded-lg transition-colors text-sm"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.8 13.3l7.8 6C12.4 13.3 17.8 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.3z"/>
          <path fill="#FBBC05" d="M10.6 28.7A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.6 2.5 10.9l8.1-6.2z"/>
          <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.8l-8.1 6.2C6.6 42.5 14.7 48 24 48z"/>
        </svg>
        Continue with Google
      </button>
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}
    </div>
  )
}
