import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import ComparisonPage from './pages/ComparisonPage'
import AuthPage from './pages/AuthPage'
import FavoritesPage from './pages/FavoritesPage'
import ProtectedRoute from './components/common/ProtectedRoute'
import { useThemeStore } from './store/themeStore'

export default function App() {
  const { dark } = useThemeStore()

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/compare/:id" element={<ComparisonPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}
