# Product Requirements Document (PRD)

## 📊 Project Overview
**Product Name:** CompareGo (Placeholder)
**Description:** A full-stack web application allowing college students to search and compare products across major e-commerce platforms (Amazon, Flipkart, Myntra, etc.) in real-time to find the best deals, card offers, and verified reviews without opening dozens of tabs.
**Timeline:** 1-2 weeks (MVP)
**Tech Stack:** React (Frontend), Java & Spring Boot (Backend), SerpAPI (Data Source)

## 🎯 Product Vision
To be the ultimate starting point for online shopping for budget-conscious college students, bringing transparency to pricing and eliminating the friction of cross-platform bargain hunting.

## 👤 Target User
- **Persona:** College Students navigating tight budgets.
- **Pain Points:** Constantly switching between 10+ browser tabs, missing out on obscure credit/debit card offers, and struggling to quickly filter out fake reviews.
- **User Goal:** Find the absolute lowest price and best hidden offers for a high-value item quickly and confidently.

## ✨ Core Features
1. **Unified Global Search Engine**
   - User enters a query (e.g., "iPhone 15 128GB").
   - Java backend securely queries SerpAPI for Amazon, Flipkart, Myntra, etc., concurrently.
   - **Spec:** Response time strictly < 3.0 seconds utilizing async Java threads and caching.
2. **Unified Product Dashboard**
   - Matches identical products from different APIs using title/model number algorithms.
   - **Spec:** Displays a hero product card with a grid/table below it featuring prices from different platforms side-by-side.
3. **Global Sorting & Filtering**
   - **Spec:** A prominent "Absolute Lowest Price" toggle which instantly re-ranks the fetched results from all platforms combined.
4. **Deal & Bank Offer Highlighting**
   - **Spec:** Explicitly extracts and badges bank/card offers on the UI (e.g., a green tag saying "10% off on HDFC").
5. **User Account System (Auth)**
   - Registration/Login via Email/Password or JWT.
   - **Spec:** Enables saving specific items to a "Favorites" list.
6. **Price Drop Alerts (Watchlist)**
   - Users can add an item to their watchlist and define a target budget.
   - **Spec:** Java cron background job runs daily checks via SerpAPI and alerts the user via dashboard notification/email if current price drops below the target price.
7. **Search History Viewer**
   - **Spec:** Authenticated users have a dashboard table displaying their 10 most recent searches with a 1-click "Re-run Search" button.

## 📱 Screen Inventory
1. **Landing Page:** Minimalist, Google-like UI. Centered search bar, clean typography, zero clutter.
2. **Search Results Page (SRP):** Horizontal scroll or grid of matched products.
3. **Product Detail Page (PDP) / Dashboard:** The core view.
   - *Top/Left:* Product image and unified description.
   - *Right:* Simple bar chart comparing current prices across platforms.
   - *Bottom:* Stack of seller comparison cards (Amazon vs Flipkart) with obvious 'Buy Now' affiliate links.
4. **User Portal (Auth):** Clean Login/Register screens. 
5. **Profile Dashboard:** View Saved Favorites, Active Price Alerts, and Search History.

## 🔄 Key User Flows
**Flow A: Searching & Comparing (Guest User)**
1. User lands on homepage and types "Sony WH-1000XM5".
2. Loading skeleton appears (max 3s).
3. User is presented with top matched products and clicks the exact model.
4. User lands on the PDP Dashboard displaying a bar chart of prices across Amazon, Flipkart, and Croma.
5. User clicks "Global Lowest Price" sort button; Flipkart bubbles to the top at ₹24,990.
6. User clicks "Go to Store" and is redirected to Flipkart.

**Flow B: Setting a Price Alert (Logged In User)**
1. User logs in and navigates to the PDP for "Airpods Pro".
2. Current lowest price is ₹18,000. User clicks "Set Price Alert".
3. UI modal prompts for target price. User inputs "₹16,000" and clicks Save.
4. System saves the alert to the database and tracks it daily in the background.

## 📊 Success Metrics
1. **Performance:** Search results fetch, parse, and render in under 3.0 seconds.
2. **Adoption:** 20 verified user registrations in the MVP rollout.
3. **Quality:** 0 P0/P1 bugs in production; serves as a flawless, highly polished portfolio piece.
4. **Utility:** At least 50 successful click-throughs (redirects to vendor sites) generated.

## 🚫 Out of Scope
1. **In-App Checkout:** No handling of payments, carts, or native checkouts (affiliate redirection only).
2. **Historical Price Tracking:** Since we don't have historical database records on Day 1, graphs will only compare *current* prices across platforms, not past 6-month trends.
3. **Native Mobile App:** No iOS/Android builds (sticking to responsive Web/React).
4. **Deep Review Aggregation:** Scraping thousands of reviews to do sentiment analysis is excluded; MVP merely displays the average star rating and review count from each platform.

## 🎯 Development Phases
**Phase 1 (Days 1-5): Core Search & Minimal UI**
- Setup React frontend and Java backend environments.
- Integrate SerpAPI to accurately fetch from Amazon and Flipkart.
- Build Google-like landing page and the product comparison layout.
- Implement cross-platform global sorting logic.

**Phase 2 (Days 6-10): Accounts & Dashboards**
- Integrate PostgreSQL/MySQL database & user Auth.
- Build Favorites & Search History views.
- Build the Java Price Drop Alert cron job scheduler.
- Polish dashboard elements (implement price comparison charts/cards).

**Phase 3 (Days 11-14): Testing & Launch**
- End-to-end bug squashing.
- Optimize API calls (implement Redis/In-memory caching so duplicate searches don't bleed SerpAPI credits).
- Deploy to production.

## 🔐 Privacy & Safety
- **Passwords:** Strong hashing for user passwords. No plain text storage.
- **Data Collection:** Collect minimal data (email, search history). No intrusive tracking.
- **API Keys:** SerpAPI and DB credentials securely stored in environment variables; strictly ignored in version control (.gitignore).

## ✅ Definition of Done
- App is live and accessible on a public URL.
- User can search an item and see aggregated results from at least 2 distinct platforms.
- Sorting by "absolute lowest price" functions flawlessly.
- User can successfully register, login, and set a price alert.
- UI renders cleanly and responsively on both a mobile screen and desktop.

## 🎨 Design System
- **Vibe:** Minimalist Google-like core natively blended with a data-rich E-commerce dashboard.
- **Primary Color:** `#1A73E8` (Google Blue - denotes trust, search, and action).
- **Background Color:** `#F8F9FA` (Off-white for minimal eye strain and clean contrast).
- **Cards/Containers:** `#FFFFFF` with slight subtle shadow (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)`) for elevation.
- **Typography:** `Inter` or `Roboto` (sans-serif, highly legible).
- **Accents:** Green (`#0F9D58`) exclusively for lowest prices and bank discounts to immediately guide the user's eye to the deals.
