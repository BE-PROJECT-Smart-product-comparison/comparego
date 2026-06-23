export default function ErrorMessage({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <span className="text-4xl">⚠️</span>
      <p className="text-slate-600 dark:text-slate-400 text-center max-w-sm">{message}</p>
    </div>
  )
}
