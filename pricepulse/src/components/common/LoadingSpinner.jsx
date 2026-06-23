export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 text-sm">{message}</p>
    </div>
  )
}
