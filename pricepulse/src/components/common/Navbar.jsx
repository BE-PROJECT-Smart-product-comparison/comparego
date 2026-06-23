import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'
import SearchBar from './SearchBar'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuthStore()
  const { dark, toggleDark } = useThemeStore()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-lg text-primary hidden sm:block">CompareGo</span>
        </Link>

        {/* Search bar — grows to fill space */}
        <div className="flex-1">
          <SearchBar
            compact
            onSearch={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {isLoggedIn ? (
            <>
              <Link
                to="/favorites"
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors text-sm font-medium"
              >
                ♥ Saved
              </Link>
              <button
                onClick={logout}
                className="btn-outline text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn-primary text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
