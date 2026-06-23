import { useState, useEffect } from 'react'
import FavoritesList from '../components/favorites/FavoritesList'
import { historyApi } from '../api/historyApi'
import { useNavigate } from 'react-router-dom'

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('saved') // 'saved' | 'history'
  const [history, setHistory] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const navigate = useNavigate()

  const fetchHistory = async () => {
    setLoadingHistory(true)
    try {
      const data = await historyApi.getAll()
      setHistory(data)
    } catch (err) {
      console.error('Failed to fetch search history', err)
    } finally {
      setLoadingHistory(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory()
    }
  }, [activeTab])

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      try {
        await historyApi.clear()
        setHistory([])
      } catch (err) {
        console.error('Failed to clear search history', err)
      }
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Profile & Activity</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your saved comparison list and search history.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
        <button
          onClick={() => setActiveTab('saved')}
          className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'saved'
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          ♥ Saved Comparisons
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-2 px-4 font-semibold text-sm border-b-2 transition-colors ${
            activeTab === 'history'
              ? 'border-primary text-primary'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          ⏱ Search History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'saved' ? (
        <FavoritesList />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Search Queries</h3>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-red-500 hover:underline"
              >
                Clear History
              </button>
            )}
          </div>

          {loadingHistory ? (
            <p className="text-slate-500 text-center py-10">Loading history…</p>
          ) : history.length === 0 ? (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500 card p-6">
              <p className="text-4xl mb-3">⏱</p>
              <p className="text-base font-semibold">No search history recorded</p>
              <p className="text-xs mt-1">Search queries are saved automatically when you are logged in.</p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                    <th className="p-3">Query</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-3 font-medium">"{item.searchQuery}"</td>
                      <td className="p-3 text-slate-500 text-xs">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => navigate(`/search?q=${encodeURIComponent(item.searchQuery)}`)}
                          className="btn-outline px-2.5 py-1 text-xs"
                        >
                          Re-run Search
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
