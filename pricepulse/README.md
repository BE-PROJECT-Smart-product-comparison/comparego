# ⚡ PricePulse — React Frontend

Compare product prices across Amazon & Flipkart in real-time.

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env.local

# Run dev server (requires backend on :8080)
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Spring Boot backend URL (default: `http://localhost:8080`) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth2 client ID from Google Cloud Console |

## Folder Structure

```
src/
├── api/            # Axios instance + API call functions
├── components/
│   ├── common/     # Navbar, SearchBar, LoadingSpinner, ProtectedRoute
│   ├── product/    # ProductCard, PlatformRow, BestDealBadge, SortToggle, SaveButton
│   ├── auth/       # LoginForm, RegisterForm, GoogleLoginBtn
│   └── favorites/  # FavoritesList
├── pages/          # HomePage, SearchResultsPage, ComparisonPage, AuthPage, FavoritesPage
├── store/          # Zustand stores (auth, favorites, theme)
├── hooks/          # useProductSearch, useAuth
└── utils/          # formatPrice, calcDiscount
```

## Stack

- **React 18** + **Vite**
- **TailwindCSS** for styling
- **React Router v6** for routing
- **TanStack Query (React Query)** for server state
- **Zustand** for client state (auth, favorites, dark mode)
- **Axios** with JWT interceptor
- **@react-oauth/google** for Google OAuth

## Pages

| Route | Page | Auth |
|---|---|---|
| `/` | Home — search bar hero | No |
| `/search?q=` | Search results grid | No |
| `/compare/:id` | Full comparison (platform rows) | No (save: Yes) |
| `/auth` | Login / Register | No |
| `/favorites` | Saved products | Yes |

## Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel
```
