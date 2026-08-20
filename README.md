# Plottage Hub — Premium Real Estate & Land Discovery Platform

A complete, responsive, and interactive frontend web application built for **Plottage Hub**, a premium land discovery and investment platform. 

This project was built for **Experiment No. 1 — Build Responsive and Interactive UIs using Tailwind CSS**.

---

## 🌟 Key Highlights & Design Aesthetics

Plottage Hub is built with a **luxury black + metallic gold** visual theme designed to evoke trust, prestige, investment excellence, and advanced technology. 

- **Primary Background:** `#080808`
- **Secondary Background:** `#101010`
- **Card Background:** `#151515`
- **Metallic Gold Accent:** `#C9A34A`
- **Bright Gold Highlight:** `#E3C269`
- **Typography:** *Playfair Display* for elegant luxury headers & *Inter* for sleek modern reading.
- **Official Brand Mark:** Integrated the authentic Plottage Hub logo throughout the navbar, footer, login screens, and dashboard.

---

## 📱 Page Walkthrough & Structure

The platform includes **5 complete pages** connected using a React Router navigation flow:

1. **🏠 Home Page (`/`):**
   - High-end full-bleed video/image hero with dark luxurious overlay and gold text shimmer animation.
   - Interactive overlapping search bar (Location, Property Type, Budget, Size).
   - Scroll-into-view animated statistics counter showing Acres, Locations, and Verified Enquiries.
   - Featured opportunities with interactive wishlisting card toggles.
   - Step-by-step "How It Works" guide and investment potential sections complete with interactive progress indicators.

2. **🔍 Explore Plots Page (`/explore`):**
   - Main land discovery interface displaying realistic properties across Maharashtra.
   - Sidebar filter controls with search fields, location dropdowns, property type selections, investment purposes, and dual price range sliders.
   - Fully interactive frontend filtering & sorting (Price: Low to High / High to Low / Recommended).
   - Fully optimized mobile version with an overlay filter drawer.

3. **📋 Property Details Page (`/property/:id`):**
   - Multi-image gallery widget showing actual land vistas with prev/next controls and thumbnail strips.
   - Property highlights breakdown (Size, Road access, Connectivity, Nearby hotspots).
   - Illustrated wireframe map placeholder showing custom property pin & street networks.
   - Numerical analysis with investment potential progress bars.
   - Sticky Enquiry Card with validation and success state.

4. **🔐 Login / Register Page (`/login`):**
   - Luxury side-by-side split layout: high-resolution real estate background left, forms panel right.
   - Easy tab switcher between "Sign In" and "Create Account".
   - Full input validations (valid email structure, minimum 8 character password, matched confirmation password, mobile number format, account type roles).
   - Show/hide password visibility toggle.

5. **📊 User Dashboard (`/dashboard`):**
   - Premium sidebar navigation with gold active indicators.
   - 4 live KPI overview cards tracking portfolio interest metrics.
   - Pure-CSS bar chart showing 6-month investment trends.
   - Interactive grid panels displaying Saved Plots, Recent Enquiries with status-themed badges (Pending, Contacted, Site Visit, Closed), and Recommended Plots.

---

## 🛠️ Tech Stack & Dev Setup

* **Framework:** React 19 (via Vite 8)
* **Styling:** Tailwind CSS v4 & custom CSS variables
* **Navigation:** React Router DOM v7
* **Icons:** Lucide React

### Get Started Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/BhaveshChuryai/plottage-hub-frontend-FSD1.git
   cd plottage-hub-frontend-FSD1
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

*Note: Post-install, Vite's native compilation and Tailwind v4 PostCSS compilation will configure automatically.*

3. **Run Dev Environment:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build Production Bundle:**
   ```bash
   npm run build
   ```

---

## 🤝 Project Validation

All buttons, links, search parameters, toggle states, filter lists, and validation routines are operational. Layouts are fully validated to be responsive across standard desktop, tablet, and mobile device viewports (320px to 1440px+).
