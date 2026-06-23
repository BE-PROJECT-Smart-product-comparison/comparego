# ⚡ PricePulse — Spring Boot Backend

REST API for real-time product price comparison across Amazon & Flipkart.

---

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- MongoDB (local or Atlas)
- SerpAPI key → https://serpapi.com

### Run locally

```bash
# 1. Clone / unzip the project
cd pricepulse-backend

# 2. Set environment variables (or edit application.properties directly for dev)
export SERP_API_KEY=your_serpapi_key
export MONGO_URI=mongodb://localhost:27017/pricepulse
export JWT_SECRET=your_256bit_secret_here
export GOOGLE_CLIENT_ID=your_google_client_id
export FRONTEND_URL=http://localhost:5173

# 3. Build and run
mvn spring-boot:run
# API available at http://localhost:8080
```

---

## Project Structure

```
src/main/java/com/pricepulse/
├── PricePulseApplication.java     # Entry point
├── config/
│   ├── AppConfig.java             # BCrypt, WebClient beans
│   ├── SecurityConfig.java        # JWT filter chain + CORS
│   └── JwtAuthFilter.java         # Extracts userId from Bearer token
├── controller/
│   ├── AuthController.java        # /api/v1/auth/**
│   ├── ProductController.java     # /api/v1/products/**
│   └── FavoritesController.java   # /api/v1/favorites/**
├── service/
│   ├── AuthService.java           # Register, login, Google OAuth, refresh
│   ├── JwtService.java            # Generate + validate JWTs
│   ├── ProductService.java        # Orchestrates search flow
│   ├── SerpApiService.java        # Calls SerpAPI (parallel fetch)
│   └── FavoritesService.java      # Save / list / delete favorites
├── repository/
│   ├── UserRepository.java
│   └── FavoriteRepository.java
├── model/
│   ├── User.java                  # MongoDB document
│   └── Favorite.java              # MongoDB document
├── dto/
│   ├── AuthDtos.java              # Register/Login/Google request + AuthResponse
│   ├── ProductDtos.java           # ProductSearchResponse, PlatformListing
│   └── FavoriteDtos.java          # SaveFavoriteRequest, FavoriteResponse
├── util/
│   └── ProductNormalizer.java     # Groups + deduplicates listings
└── exception/
    └── GlobalExceptionHandler.java  # Maps all errors → clean JSON
```

---

## API Reference

### Auth (public)

| Method | Endpoint | Body |
|--------|----------|------|
| POST | `/api/v1/auth/register` | `{ name, email, password }` |
| POST | `/api/v1/auth/login` | `{ email, password }` |
| POST | `/api/v1/auth/google` | `{ token }` (Google access token) |
| POST | `/api/v1/auth/refresh` | `{ refreshToken }` |

All auth endpoints return:
```json
{
  "token": "eyJ...",
  "refreshToken": "eyJ...",
  "expiresIn": 86400,
  "user": { "id": "...", "email": "...", "name": "..." }
}
```

### Products (public)

| Method | Endpoint | Params |
|--------|----------|--------|
| GET | `/api/v1/products/search` | `?q=iPhone+15` |

### Favorites (JWT required)

| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/api/v1/favorites` | List saved products |
| POST | `/api/v1/favorites` | Save a product |
| DELETE | `/api/v1/favorites/{productId}` | Remove a product |

Pass JWT as: `Authorization: Bearer <token>`

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/pricepulse` |
| `JWT_SECRET` | Min 256-bit signing secret | `changeme_use_a_256bit_secret_in_production` |
| `JWT_EXPIRY_MS` | Access token expiry (ms) | `86400000` (24h) |
| `JWT_REFRESH_EXPIRY_MS` | Refresh token expiry (ms) | `604800000` (7d) |
| `SERP_API_KEY` | SerpAPI key | — |
| `GOOGLE_CLIENT_ID` | Google OAuth2 client ID | — |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |

---

## Deploying to Render

1. Push code to GitHub
2. Create a new **Web Service** on Render
3. Build command: `mvn clean package -DskipTests`
4. Start command: `java -jar target/pricepulse-backend-0.0.1-SNAPSHOT.jar`
5. Add all environment variables in Render dashboard
6. Set `FRONTEND_URL` to your Vercel deployment URL

---

## Notes

- `GET /api/v1/products/{id}` is a stub for MVP — the frontend passes the full product object from `/search` results directly to the comparison page via React Router state.
- SerpAPI free tier: 100 searches/month. Upgrade for production.
- MongoDB Atlas M0 (free): 512MB, sufficient for MVP user data.
