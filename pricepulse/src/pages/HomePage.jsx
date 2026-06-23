import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/common/SearchBar'
import { useThemeStore } from '../store/themeStore'
import { formatPrice } from '../utils/formatPrice'
import CategoryGrid from '../components/home/CategoryGrid'

const POPULAR = ['iPhone 15', 'Samsung 65 inch TV', 'boAt earbuds', 'Realme 12 Pro', 'Laptop under 50000']

const FLIPKART_POPULAR = [
  {
    id: 'samsung-s26-ultra',
    title: 'Samsung Galaxy S26 Ultra 5G (Titanium Gray, 512 GB)',
    searchQuery: 'Samsung Galaxy S26 Ultra',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    reviewCount: 12453,
    price: 124999,
    originalPrice: 144999,
    discountPercent: 13,
  },
  {
    id: 'canon-printer-g3012',
    title: 'Canon PIXMA G3012 Wireless All-in-One Ink Tank Colour Printer (Black)',
    searchQuery: 'Canon PIXMA G3012 Printer',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80',
    rating: 4.2,
    reviewCount: 8945,
    price: 12499,
    originalPrice: 15499,
    discountPercent: 19,
  },
  {
    id: 'hp-laserjet-m1005',
    title: 'HP LaserJet M1005 Multifunction Monochrome Laser Printer (Gray)',
    searchQuery: 'HP LaserJet M1005 Printer',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    reviewCount: 4321,
    price: 21899,
    originalPrice: 24999,
    discountPercent: 12,
  },
  {
    id: 'brother-dcp-l2520d',
    title: 'Brother DCP-L2520D Multi-function Monochrome Laser Printer (Black)',
    searchQuery: 'Brother DCP-L2520D Printer',
    image: 'https://images.unsplash.com/photo-1583339822497-2f9a738466e3?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    reviewCount: 3120,
    price: 15799,
    originalPrice: 18500,
    discountPercent: 14,
  }
]

export default function HomePage() {
  const navigate = useNavigate()
  const { dark } = useThemeStore()

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-16 min-h-[80vh]">
      {/* Hero & Search (Centered) */}
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <img src="/logo.png" alt="CompareGo Logo" className="h-32 w-auto object-contain mb-6" />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
          Smart Product Comparison
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-lg mx-auto mb-8">
          Compare prices, ratings, and specifications in real-time across Amazon & Flipkart.
        </p>

        {/* Search */}
        <div className="w-full max-w-xl">
          <SearchBar variant="home" onSearch={(q) => navigate(`/search?q=${encodeURIComponent(q)}`)} />
        </div>

        {/* Popular searches */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-slate-400 dark:text-slate-500 mr-1">Popular:</span>
          {POPULAR.map((term) => (
            <button
              key={term}
              onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
              className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <CategoryGrid />

      {/* Flipkart Popular Products (Left-aligned) */}
      <div className="w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-left border-b pb-2 border-slate-200 dark:border-slate-800">
          Flipkart Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {FLIPKART_POPULAR.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/search?q=${encodeURIComponent(product.searchQuery)}`)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="w-full h-40 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg overflow-hidden p-2 mb-3 border border-slate-100 dark:border-slate-800/50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Title & Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>

                  {/* Rating badge & review count */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0">
                      {product.rating} <span className="text-[9px]">★</span>
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      ({product.reviewCount.toLocaleString('en-IN')})
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Platform, Price, Buy Button */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                  {/* Platform Brand */}
                  <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    <span className="text-xs">🛒</span> Flipkart
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      {/* Price */}
                      <div className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                        {formatPrice(product.price)}
                      </div>
                      {/* Discount and original price */}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {product.discountPercent}% off
                        </span>
                      </div>
                    </div>

                    {/* BUY Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/search?q=${encodeURIComponent(product.searchQuery)}`);
                      }}
                      className="bg-[#d11243] hover:bg-[#b00f38] text-white text-xs font-bold px-3 py-2 rounded shadow-sm transition-colors tracking-wide uppercase shrink-0"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-8">
        <span>✅ Real-time prices</span>
        <span>✅ Best Deal highlighted</span>
        <span>✅ Save favourites</span>
        <span>✅ Amazon + Flipkart</span>
      </div>
    </main>
  )
}

