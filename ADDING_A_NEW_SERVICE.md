# Adding a New Service to Florize Flowers

This document provides a comprehensive guide for adding a new flower delivery service to the Florize Flowers comparison website.

## Overview

Services on Florize Flowers are managed through Astro's content collections system, with markdown files stored in language-specific directories. The site supports both English (en) and German (de) versions of each service.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [File Structure](#file-structure)
3. [Step-by-Step Process](#step-by-step-process)
4. [Content Schema](#content-schema)
5. [Affiliate Links](#affiliate-links)
6. [Images](#images)
7. [Testing](#testing)
8. [Deployment Checklist](#deployment-checklist)

---

## Prerequisites

Before adding a new service, ensure you have:

- [ ] Service name and slug (URL-friendly identifier, e.g., `bloom-wild`)
- [ ] Service logo image (square format, optimized for web)
- [ ] Hero image for the service page
- [ ] Service rating (0-5 scale)
- [ ] Price range information
- [ ] Delivery options
- [ ] Key features
- [ ] Testing data (if available)
- [ ] Affiliate link or direct website URL
- [ ] Content for both English and German (if supporting both languages)

---

## File Structure

```
src/content/services/
├── en/
│   └── new-service-name.md       # English version
└── de/
    └── new-service-name.md       # German version (optional)

public/images/
└── service-logo-name.jpg         # Service logo/hero images
```

---

## Step-by-Step Process

### Step 1: Create the Service Slug

Choose a URL-friendly slug for your service:
- Use lowercase letters
- Replace spaces with hyphens
- Keep it simple and memorable
- Example: "Bloom & Wild" → `bloom-wild`

### Step 2: Prepare Images

1. **Logo Image:**
   - Format: JPG, PNG, or WebP
   - Recommended size: 500x500px minimum
   - Aspect ratio: Square (1:1) preferred
   - Optimized for web
   - Save to: `/public/images/service-logo-name.jpg`

2. **Hero Image (Optional):**
   - Format: JPG or WebP
   - Recommended size: 1200x600px
   - Can reuse logo if no specific hero image available

### Step 3: Create English Service File

Create file: `src/content/services/en/[service-slug].md`

```yaml
---
lang: en
base:
  id: "service-slug"
  name: "Service Name"
  title: "Service Name Review 2025 - Brief Description | Florize"
  description: "SEO meta description for the service review page"
  logo_path: "/images/service-logo.jpg"
  hero_image: "/images/service-hero.jpg"
  rating: 4.5
  price_range: "£25-£85"
  winner_badge: "Best Overall"  # Optional: "Most Innovative", "Best Value", etc.
  delivery_options:
    - "Next-day delivery"
    - "Same-day available"
  key_features:
    - "Feature 1"
    - "Feature 2"
  founded: 2020  # Optional

seo:
  keywords: "service name review, flower delivery, keywords"
  date_published: "2025-01-15"
  date_modified: "2025-01-15"

summary:
  best_for: "Who this service is best suited for"
  delivery: "Delivery options summary"
  rating_text: "4.5/5 - Brief rating explanation"

overview:
  positioning: "Service Positioning Statement"
  content: |
    <p>First paragraph about the service...</p>
    <p>Second paragraph...</p>

components:
  pros_title: "Strengths"
  cons_title: "Considerations"
  pros:
    - label: "Pro 1 Title"
      description: "Detailed explanation"
    - label: "Pro 2 Title"
      description: "Detailed explanation"
  cons:
    - label: "Con 1 Title"
      description: "Detailed explanation"
    - label: "Con 2 Title"
      description: "Detailed explanation"
  testing_metrics:
    - icon: "📦"
      label: "Orders Tested"
      value: "20"
      description: "Over 6 months"
    - icon: "🚚"
      label: "Delivery Success"
      value: "95%"
      description: "On-time delivery rate"
    - icon: "🌸"
      label: "Bloom Life"
      value: "14 days"
      description: "Average longevity"

affiliate:
  url: "https://www.service-website.com/"

comparisons:
  items:
    - competitor: "Competitor Name"
      category: "Category"
      description: "How this service compares to the competitor"
  use_cases:
    heading: "When to Choose [Service Name]"
    scenarios:
      - label: "Perfect for"
        description: "Use case description"
      - label: "Best suited for"
        description: "Target audience description"

recommendations:
  sections:
    - heading: "Perfect Customer Match"
      content: "<p>Who should choose this service...</p>"
    - heading: "Consider Alternatives If..."
      content: "<p>When to choose a different service...</p>"
  cta: "Visit [Service Name]"

related:
  heading: "Compare Similar Services"
  reviews:
    - title: "Competitor Review"
      serviceId: "competitor-slug"
      description: "Brief comparison description"
---

## Main Content

Write your detailed review content here using markdown. This appears below the structured components.

### Section Headers

You can use standard markdown formatting for the main review content.
```

### Step 4: Create German Service File (Optional)

Create file: `src/content/services/de/[service-slug].md`

Use the same structure as the English file but translate all content. Keep the same:
- `base.id` (must match English version)
- `logo_path` and `hero_image` paths
- `affiliate.url` (unless there's a German-specific affiliate link)

### Step 5: Add Affiliate Link to Sanity CMS (Recommended)

While affiliate URLs can be stored directly in the markdown files, it's recommended to manage them through Sanity CMS for easier updates.

1. Log into Sanity Studio (usually at `/studio`)
2. Navigate to "Florize Configuration"
3. Add a new affiliate link with:
   - **Service ID:** `service-slug` (must match the service file name)
   - **Affiliate URL:** Your affiliate/tracking link
   - **Locale:** Leave empty for all languages, or specify `en`/`de` for language-specific links
   - **Notes:** Optional internal notes

**Fallback Chain:**
The system looks for affiliate links in this order:
1. Sanity CMS (locale-aware)
2. `affiliate.url` in the markdown file
3. Internal service page link

---

## Content Schema

### Required Fields

**Minimum viable service entry:**
```yaml
lang: en
base:
  id: "service-slug"
  name: "Service Name"
  title: "Service Name Review | Florize"
  description: "Brief description"
  logo_path: "/images/logo.jpg"
  rating: 4.5
  price_range: "£25-£85"
  delivery_options:
    - "Delivery option 1"
  key_features:
    - "Feature 1"
```

### Optional But Recommended Fields

- `base.winner_badge` - Appears in comparison tables ("Best Overall", "Best Value", "Most Innovative")
- `base.hero_image` - Larger image for the service page hero section
- `base.founded` - Year founded
- `components.testing_metrics` - Adds credibility with real testing data
- `components.pros` and `components.cons` - Essential for detailed reviews
- `comparisons` - Helps users understand positioning vs competitors
- `recommendations` - Guides users to make informed decisions
- `related.reviews` - Links to competitor reviews for comparison

### Field Descriptions

**Rating (base.rating):**
- Scale: 0.0 to 5.0
- Use increments of 0.1 (e.g., 4.3, 4.7)
- Based on: Delivery reliability, flower quality, value, customer service

**Price Range (base.price_range):**
- Format: `"£[low]-£[high]"` (e.g., `"£25-£85"`)
- Represents typical/starting prices for most common arrangements
- Use local currency symbols

**Winner Badges:**
Common options:
- "Best Overall"
- "Best Value"
- "Most Innovative"
- "Premium Quality"
- "Budget Option"

**Icons for Testing Metrics:**
Common icon options: 📦 🚚 🌸 ✅ 🌍 ♻️ ⭐ 💰 📅 ⏰

---

## Affiliate Links

### Option 1: Markdown File (Simple)

Add to the service markdown file:
```yaml
affiliate:
  url: "https://affiliate-link.com/?ref=florize"
```

### Option 2: Sanity CMS (Recommended)

Benefits:
- Update all affiliate links from one place
- Language-specific links
- Track which links are active
- Add internal notes

In Sanity Studio:
1. Go to "Florize Configuration"
2. Under "Affiliate Links", add new entry:
   ```
   Service ID: service-slug
   Affiliate URL: https://your-affiliate-link.com
   Locale: (empty for all, or 'en'/'de')
   Notes: (optional internal notes)
   ```

### Testing Affiliate Links

After adding affiliate links, verify:
1. Comparison table "Visit Service" button uses correct link
2. Service page CTA buttons use correct link
3. Links include proper `rel="nofollow sponsored"` attributes
4. Links open in new tab (`target="_blank"`)

---

## Images

### Image Requirements

**Service Logos:**
- Location: `/public/images/`
- Format: JPG, PNG, or WebP
- Minimum size: 500x500px
- Aspect ratio: Square (1:1) preferred
- Optimized for web (< 200KB recommended)
- File naming: `service-name-logo.jpg` or `service-professional-X.jpg`

**Hero Images:**
- Location: `/public/images/`
- Format: JPG or WebP
- Recommended size: 1200x600px
- Aspect ratio: 2:1 preferred
- Optimized for web (< 300KB recommended)

### Image Optimization Tips

1. Use tools like TinyPNG or Squoosh to compress images
2. Consider WebP format for better compression
3. Ensure images are visually clear at thumbnail size (70x70px for comparison tables)
4. Use descriptive file names

---

## Testing

### Build Test

```bash
npm run build
```

Check for:
- No build errors
- Service pages generate correctly for both languages
- Images load properly

### Development Preview

```bash
npm run dev
```

Verify:
1. **Homepage Comparison Table:**
   - Service appears if rating is high enough (top 5)
   - Logo displays correctly
   - Service name aligns properly
   - Buttons work and use correct links

2. **Services Index Page:**
   - Service card appears
   - Rating stars display
   - Links work

3. **Service Detail Page:**
   - English: `/en/services/service-slug`
   - German: `/de/services/service-slug`
   - All sections render
   - Images load
   - Affiliate buttons work
   - Related services link correctly

4. **Mobile Responsiveness:**
   - Test comparison table switches to card layout
   - Service page is readable on mobile
   - Images scale appropriately

### Content Validation

- [ ] All required fields present
- [ ] Rating is between 0 and 5
- [ ] Price range format is correct
- [ ] All internal service IDs match file names
- [ ] Related services references are valid
- [ ] No translation keys are missing
- [ ] HTML in content fields is valid
- [ ] Affiliate links work

---

## Deployment Checklist

Before deploying a new service:

### Pre-Deploy
- [ ] English service file created and complete
- [ ] German service file created (if supporting German)
- [ ] Images uploaded to `/public/images/`
- [ ] Images optimized for web
- [ ] Affiliate link configured (Sanity or markdown)
- [ ] Build test passes (`npm run build`)
- [ ] Development preview looks correct
- [ ] All links tested and working
- [ ] Content proofread for typos
- [ ] SEO fields completed (title, description, keywords)

### Post-Deploy
- [ ] Verify service page loads on production
- [ ] Check both language versions (if applicable)
- [ ] Test affiliate links from production site
- [ ] Verify service appears in comparison tables
- [ ] Check Google Search Console for new pages
- [ ] Monitor for any 404 errors
- [ ] Update sitemap is generated correctly

---

## Common Issues & Troubleshooting

### Service Doesn't Appear in Comparison Table

**Possible causes:**
1. Rating is too low (only top 5 services by rating appear on homepage)
2. File name doesn't match `base.id`
3. Build cache issue - try `npm run build` again
4. Service file has YAML syntax errors

**Solution:** Check console for build errors, verify rating and file naming.

### Images Don't Load

**Possible causes:**
1. Incorrect path in `logo_path` or `hero_image`
2. Image file not in `/public/images/`
3. File name typo
4. Image file permissions

**Solution:** Verify file exists at specified path, check spelling.

### Affiliate Link Not Working

**Possible causes:**
1. Sanity CMS affiliate link not saved
2. Service ID mismatch between markdown and Sanity
3. Fallback to internal link working as designed

**Solution:** Check Sanity Studio, verify service IDs match exactly, test affiliate link URL directly.

### Translation Keys Missing

**Possible causes:**
1. Using translation keys not defined in `src/i18n/translations.ts`
2. Language file incomplete

**Solution:** Check browser console for "Translation key not found" messages, add missing keys to translations file.

### Service Page 404 Error

**Possible causes:**
1. File not in correct language folder (`en/` or `de/`)
2. File extension is not `.md`
3. File name has spaces or special characters

**Solution:** Verify file location and naming convention.

---

## Example: Complete Minimal Service

Here's a complete minimal example for a new service called "Petal Post":

**File:** `src/content/services/en/petal-post.md`

```yaml
---
lang: en
base:
  id: "petal-post"
  name: "Petal Post"
  title: "Petal Post Review 2025 - Fast Flower Delivery | Florize"
  description: "Complete Petal Post review. Fast delivery, competitive pricing, quality flowers. Expert testing and comparison with top UK services."
  logo_path: "/images/petal-post-logo.jpg"
  rating: 4.3
  price_range: "£20-£70"
  delivery_options:
    - "Next-day delivery"
    - "Weekend delivery"
  key_features:
    - "Free standard delivery"
    - "Freshness guarantee"

seo:
  keywords: "petal post review, flower delivery, uk flowers"
  date_published: "2025-01-15"
  date_modified: "2025-01-15"

summary:
  best_for: "Budget-conscious customers seeking reliable next-day delivery"
  delivery: "Next-day and weekend delivery available"
  rating_text: "4.3/5 - Excellent value for money"

affiliate:
  url: "https://www.petalpost.co.uk/"
---

## About Petal Post

Petal Post offers reliable flower delivery across the UK with a focus on value and speed. Founded in 2018, they've built a reputation for consistent quality and customer service.

Their next-day delivery service covers most UK postcodes, making them a convenient choice for last-minute occasions.
```

---

## Additional Resources

- **Astro Content Collections:** https://docs.astro.build/en/guides/content-collections/
- **Sanity Studio Setup:** Check project's `/studio` directory
- **Translation Files:** `src/i18n/translations.ts`
- **Content Schema:** `src/content/config.ts`
- **Affiliate Links System:** `src/utils/affiliateLinks.ts`

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check the existing service files for examples
2. Review the content schema in `src/content/config.ts`
3. Test in development mode first (`npm run dev`)
4. Check browser console and terminal for error messages
5. Ensure all file names use kebab-case (lowercase with hyphens)

---

## Version History

- **v1.0** (2025-01-15): Initial documentation
