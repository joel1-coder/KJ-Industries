# KJ Indus - PRECISION Software Marketplace Website

## Project Overview
A dark-themed, premium software marketplace website inspired by the "PRECISION" design. The site features a modern SaaS/software marketplace with product listings, pricing tiers, client testimonials, and a professional landing page.

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (no frameworks)
- **Backend**: Node.js with Express.js (prepared for admin login system)
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Icons**: Lucide Icons (CDN)

## Folder Structure
```
KJ Indus/
├── claude.md                    # This file - project documentation
├── frontend/
│   ├── index.html               # Homepage (landing page)
│   ├── products.html            # Products/Marketplace page
│   ├── css/
│   │   └── styles.css           # Main stylesheet
│   ├── js/
│   │   └── main.js              # Main JavaScript
│   └── assets/
│       └── images/              # Product images (generated via AI)
│           ├── omnicore_admin.png
│           ├── fluxstore_ecom.png
│           ├── atlas_project.png
│           ├── nexus_web3.png
│           ├── cognito_ai.png
│           └── hero_bg.png
├── backend/
│   ├── server.js                # Express server (future)
│   ├── package.json             # Node dependencies (future)
│   └── routes/                  # API routes (future)
│       └── auth.js              # Admin authentication (future)
```

## Pages

### 1. Homepage (`index.html`) — COMPLETE
- **Navbar**: Logo "PRECISION", nav links (Products, Services, About, Contact), icons, Get Started button
- **Hero Section**: Title "Professional Software Solutions Ready for Deployment", CTAs, stats (99.9% uptime, 500+ deployments, 15ms latency, 24/7 support)
- **Featured Ecosystem**: 3 product cards (Enterprise Portfolio, Precision DBMS, Real-time Analytics)
- **Why Precision Intelligence**: Feature list with icons, decorative grid visualization
- **Client Success Stories**: 2 testimonial cards with star ratings
- **Transparent Tiering**: 3 pricing cards (Starter $4.5k, Professional $12k, Enterprise Custom)
- **CTA Section**: "Ready to Build the Future?" with button
- **Footer**: 4-column layout with links

### 2. Products Page (`products.html`) — COMPLETE
- **Hero**: "Next-Gen Software Marketplace" heading
- **Search & Filters**: Search bar, sort dropdown, grid/list toggle, category pills
- **Product Cards**: 5 products (OmniCore Admin $199, FluxStore E-com $249, Atlas Project OS $320, Nexus Web3 $599, Cognito AI $129)
- **Load More** button
- **Footer**: Same as homepage

## Design System
- **Primary Color**: `#00e5ff` (Cyan/Teal)
- **Background**: `#0a0a0f` (Near black)
- **Card Background**: `#12121a` with `#1a1a2e` borders
- **Text Colors**: `#ffffff` (headings), `#94a3b8` (body text)
- **Border Radius**: 12px (cards), 8px (buttons), 24px (pills)
- **Animations**: Fade-in on scroll, hover lifts, gradient glow effects

## Current Status
- [x] Frontend folder structure
- [x] Homepage (index.html) - fully built
- [x] Products page (products.html) - fully built
- [x] CSS styles (styles.css) - complete
- [x] JavaScript (main.js) - complete
- [x] AI-generated product images
- [ ] Backend setup (Node.js/Express)
- [ ] Admin login system
- [ ] Database integration

## Notes for Other AI Assistants
- Images are in `frontend/assets/images/` — they are AI-generated PNG files
- The CSS uses CSS custom properties (variables) defined in `:root`
- JavaScript handles: scroll animations, mobile nav toggle, category filtering, pricing toggle
- Both pages share the same navbar and footer structure
- The design closely matches the PRECISION Stitch mockup provided by the user
- Backend folder is prepared but empty — admin login is the next phase
