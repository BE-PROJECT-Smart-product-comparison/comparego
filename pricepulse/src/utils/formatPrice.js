// Format number as Indian Rupee
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Calculate discount percentage
export function calcDiscount(original, current) {
  if (!original || original <= current) return 0
  return Math.round(((original - current) / original) * 100)
}
