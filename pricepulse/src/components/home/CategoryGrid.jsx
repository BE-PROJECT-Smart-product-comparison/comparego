import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { name: 'Water Purifiers', icon: 'water-purifier' },
  { name: 'Induction Cooktops', icon: 'induction-cooktop' },
  { name: 'Water Geysers', icon: 'water-geyser' },
  { name: 'Irons', icon: 'iron' },
  { name: 'Coffee makers', icon: 'coffee-maker' },
  { name: 'Fans', icon: 'fan' },
  { name: 'Mixer Juicer Grinder', icon: 'mixer-juicer' },
  { name: 'UPS', icon: 'ups' },
  { name: 'Vacuum Cleaners', icon: 'vacuum-cleaner' },
  { name: 'Emergency Lights', icon: 'emergency-light' },
  { name: 'Voltage Stabilizers', icon: 'voltage-stabilizer' },
  { name: 'Digital Thermometers', icon: 'thermometer' },
  { name: 'Microwave Ovens', icon: 'microwave' },
  { name: 'Oven Toaster Grills', icon: 'oven-toaster' },
  { name: 'Sewing Machines', icon: 'sewing-machine' },
  { name: 'Room Heaters', icon: 'room-heater' },
  { name: 'Surveillance Cameras', icon: 'surveillance-camera' },
  { name: 'Glucometers', icon: 'glucometer' },
  { name: 'Landline Phones', icon: 'landline-phone' },
  { name: 'Anti Pollution Mask', icon: 'mask', highlight: true },
  { name: 'Hand Sanitizer', icon: 'hand-sanitizer' },
  { name: 'Toiletries', icon: 'toiletries' },
  { name: 'Toothpaste', icon: 'toothpaste' },
  { name: 'Hair Oil', icon: 'hair-oil' }
]

function CategoryIcon({ name }) {
  switch (name) {
    case 'water-purifier':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25V18.75A2.25 2.25 0 0 1 17.25 21H6.75A2.25 2.25 0 0 1 4.5 18.75V5.25m15 0a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25m15 0v3.375c0 .621-.504 1.125-1.125 1.125h-9.75c-.621 0-1.125-.504-1.125-1.125V5.25M9 15h6M12 11.25v2.25M12 18v.008H12.01" />
        </svg>
      )
    case 'induction-cooktop':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="6" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="10" y1="17" x2="14" y2="17" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17.5" cy="17" r="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'water-geyser':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="6" y="3" width="12" height="17" rx="5" />
          <line x1="9" y1="20" x2="9" y2="22" />
          <line x1="15" y1="20" x2="15" y2="22" />
          <circle cx="12" cy="10" r="1.5" />
          <path d="M12 13v3" />
        </svg>
      )
    case 'iron':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 18a2.5 2.5 0 0 0-2.5-2.5H4L6.5 7h7.8a4 4 0 0 1 4 4v5.5a1.5 1.5 0 0 1-1.5 1.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V4.5a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 18 4.5V9.5" />
          <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
        </svg>
      )
    case 'coffee-maker':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M6 3h12a1 1 0 0 1 1 1v4H5V4a1 1 0 0 1 1-1Z" />
          <path d="M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z" />
          <rect x="8" y="12" width="8" height="6" rx="1" />
          <path d="M12 8v2" />
        </svg>
      )
    case 'fan':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 9V3M12 15v6M9 12H3M15 12h6" />
          <path d="M12 9a3 3 0 0 1 3-3h3M12 15a3 3 0 0 1-3 3H6M9 12a3 3 0 0 1 3 3v3M15 12a3 3 0 0 1-3-3V6" strokeLinecap="round" />
        </svg>
      )
    case 'mixer-juicer':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M8 8h8l1 9H7l1-9Z" />
          <rect x="6" y="17" width="12" height="4" rx="1" />
          <path d="M12 4v4" />
          <path d="M10 4h4" />
        </svg>
      )
    case 'ups':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <rect x="8" y="15" width="8" height="3" rx="1" />
        </svg>
      )
    case 'vacuum-cleaner':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="9" cy="15" r="4" />
          <circle cx="9" cy="15" r="1" />
          <path d="M13 15h4a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
          <path d="M13 5L8 9" />
        </svg>
      )
    case 'emergency-light':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="8" y="3" width="8" height="14" rx="2" />
          <path d="M12 17v4" />
          <path d="M10 21h4" />
          <circle cx="12" cy="8" r="2" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      )
    case 'voltage-stabilizer':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="7" y="7" width="10" height="5" rx="1" />
          <line x1="10" y1="9.5" x2="14" y2="9.5" strokeWidth="2" />
          <circle cx="9" cy="16" r="1" />
          <circle cx="15" cy="16" r="1" />
        </svg>
      )
    case 'thermometer':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M14 4l6 6M17.5 7.5l-9 9a2 2 0 0 1-2.8 0l-1.4-1.4a2 2 0 0 1 0-2.8l9-9M4 20l2-2" strokeLinecap="round" />
        </svg>
      )
    case 'microwave':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <rect x="6" y="8" width="9" height="8" rx="1" />
          <circle cx="18" cy="9" r="1" />
          <circle cx="18" cy="12" r="1" />
          <circle cx="18" cy="15" r="1" />
        </svg>
      )
    case 'oven-toaster':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <rect x="6" y="8" width="9" height="8" rx="1" />
          <line x1="18" y1="8" x2="18" y2="16" />
        </svg>
      )
    case 'sewing-machine':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4 18h16M7 18V9h8v9M15 9h3v5h-3M19 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM11 18v-4" />
        </svg>
      )
    case 'room-heater':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <line x1="8" y1="8" x2="8" y2="16" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="16" y1="8" x2="16" y2="16" />
        </svg>
      )
    case 'surveillance-camera':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M5 8h12l3 3H3zM9 11v5a3 3 0 0 0 6 0v-5" />
          <line x1="5" y1="8" x2="9" y2="4" />
          <circle cx="12" cy="15" r="1" />
        </svg>
      )
    case 'glucometer':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="6" y="4" width="12" height="14" rx="3" />
          <rect x="9" y="7" width="6" height="4" rx="1" />
          <line x1="12" y1="18" x2="12" y2="21" />
          <path d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      )
    case 'landline-phone':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="5" y="8" width="14" height="13" rx="2" />
          <path d="M4 6c0-1 2-2 5-2s5 1 5 2l-1 4H5L4 6Z" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="9" cy="16" r="1" />
          <circle cx="12" cy="16" r="1" />
          <circle cx="15" cy="16" r="1" />
        </svg>
      )
    case 'mask':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 10c2-3 5-4 9-4s7 1 9 4c0 0-2 6-9 6s-9-6-9-6Z" />
          <circle cx="10" cy="10" r="1" />
          <circle cx="14" cy="10" r="1" />
          <path d="M3 10l-1-2M21 10l1-2" />
        </svg>
      )
    case 'hand-sanitizer':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="7" y="9" width="10" height="12" rx="2" />
          <path d="M12 9V5" />
          <path d="M12 5h3M9 6a3 3 0 0 1 3-3" />
          <circle cx="12" cy="14" r="1.5" />
        </svg>
      )
    case 'toiletries':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="8" y="11" width="8" height="10" rx="2" />
          <line x1="10" y1="11" x2="10" y2="4" />
          <line x1="14" y1="11" x2="14" y2="6" />
          <path d="M9 4h2M13 6h2" />
        </svg>
      )
    case 'toothpaste':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M6 18h12l-2-12H8L6 18Z" />
          <rect x="10" y="3" width="4" height="3" rx="0.5" />
          <line x1="6" y1="14" x2="18" y2="14" />
        </svg>
      )
    case 'hair-oil':
      return (
        <svg className="w-8 h-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="7" y="8" width="10" height="13" rx="2" />
          <path d="M12 8V4" />
          <circle cx="12" cy="4" r="1.5" />
          <path d="M10 13h4M10 16h4" />
        </svg>
      )
    default:
      return null
  }
}

export default function CategoryGrid() {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-left">
        Popular Categories
      </h2>
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900/50 shadow-sm">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-y-8 gap-x-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate(`/search?q=${encodeURIComponent(category.name)}`)}
              className="flex flex-col items-center gap-2.5 text-center group cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center shadow-sm group-hover:border-primary group-hover:shadow transition-all duration-200">
                <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                  <CategoryIcon name={category.icon} />
                </span>
              </div>

              {/* Label */}
              <span
                className={`text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 max-w-[85px] transition-colors
                  ${
                    category.highlight
                      ? 'text-red-500 dark:text-red-400 group-hover:text-red-600'
                      : 'text-slate-600 dark:text-slate-400 group-hover:text-primary'
                  }`}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
