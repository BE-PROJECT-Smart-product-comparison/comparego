import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import ProtectedRoute from './components/common/ProtectedRoute'
import LoadingSpinner from './components/common/LoadingSpinner'
import { useThemeStore } from './store/themeStore'

// Lazy loaded page components
const HomePage = lazy(() => import('./pages/HomePage'))
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'))
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

export default function App() {
  const { dark } = useThemeStore()

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-dark">
        <Navbar />
        <Suspense fallback={<LoadingSpinner message="Loading page…" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/compare/:id" element={<ComparisonPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
