import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function RegisterForm({ onSwitch }) {
  const { handleRegister } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await handleRegister(form)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create account</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-primary font-medium hover:underline">
          Login
        </button>
      </p>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
        <input
          type="text"
          required
          className="input dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Riya Sharma"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <input
          type="email"
          required
          autoComplete="email"
          className="input dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
        <input
          type="password"
          required
          autoComplete="new-password"
          className="input dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Min. 6 characters"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-60">
        {loading ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  )
}
