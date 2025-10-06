# Florize Flowers - Astro + Sanity CMS

Modern flower delivery comparison website built with Astro and Sanity CMS.

## Architecture

This project uses a **hybrid content management strategy**:

- **Sanity CMS**: Dynamic business content (affiliate links, banners, promotions, tracking scripts)
- **Astro Content Collections**: Editorial content (service reviews, occasion guides, static pages)

## Tech Stack

- **Framework**: Astro 5.x with TypeScript
- **CMS**: Sanity (headless CMS)
- **Styling**: Tailwind CSS
- **Content**: Hybrid (Sanity + Content Collections)
- **Deployment**: Static site generation (SSG)

## Project Structure

```
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Base components (Button, Card, etc.)
│   │   ├── sections/    # Page sections
│   │   └── navigation/  # Header, Footer, GlobalHeaders
│   ├── content/         # Content Collections (markdown)
│   │   ├── services/    # Service review content
│   │   └── occasions/   # Occasion guide content
│   ├── lib/             # Sanity client integration
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing
│   ├── styles/          # Global CSS
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── schemas/             # Sanity CMS schemas
└── public/              # Static assets
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your Sanity credentials:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

**Note**: The site will work without Sanity configured (graceful fallback), but Sanity features won't be available.

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:4321`

### 4. Build for Production

```bash
npm run build
```

## Content Management

### Adding Service Reviews

Create a new markdown file in `src/content/services/[service-id].md`:

```markdown
---
title: "Service Name Review 2025"
description: "Expert review description"
service_id: "service-name"
service_name: "Service Name"
rating: 4.5
price_range: "£25-£85"
delivery_options:
  - "Same-day delivery"
key_features:
  - "Feature 1"
  - "Feature 2"
---

## Overview

Your review content here...
```

### Adding Occasion Guides

Create a new markdown file in `src/content/occasions/[occasion-id].md`:

```markdown
---
title: "Occasion Flowers Guide 2025"
description: "Guide description"
occasion_id: "occasion-name"
occasion_name: "Occasion Name"
recommended_services:
  - "service-id-1"
  - "service-id-2"
recommended_flowers:
  - flower: "Roses"
    reason: "Reason description"
---

## Guide content

Your guide content here...
```

### Managing Dynamic Content (Sanity)

To manage affiliate links, banners, and promotions, you'll need to:

1. Set up a Sanity project at https://www.sanity.io
2. Deploy the Sanity Studio (see `studio/` directory)
3. Configure the `florizeConfig` document with your data

The Sanity integration handles:
- Affiliate URLs with tracking parameters
- Seasonal promotional banners
- Global header tags (analytics, pixels)
- Featured service ordering

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Key Features

### ✅ Implemented

- Hybrid content management (Sanity + Content Collections)
- Service review pages with ratings and comparisons
- Occasion guide pages with recommendations
- Homepage with comparison table
- Responsive design with Tailwind CSS
- SEO optimization (meta tags, Open Graph)
- Graceful Sanity fallback system
- TypeScript for type safety

### 🚧 To Be Added

- More service reviews (currently 2 samples)
- More occasion guides (currently 1 sample)
- Affiliate banner components
- Seasonal promotion components
- Additional static pages (privacy policy, terms, etc.)
- Search functionality
- Filtering and sorting

## Deployment

This is a static site that can be deployed to:

- **Netlify** (recommended)
- **Vercel**
- **Google Cloud Storage**
- **Any static hosting**

### Environment Variables for Production

Make sure to set these in your deployment platform:

```
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Detailed architecture guide

## License

MIT
