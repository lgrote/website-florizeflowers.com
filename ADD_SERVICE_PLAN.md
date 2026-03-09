# Automated Service Addition Plan

This is an executable plan for Claude to add a new flower delivery service to Florize Flowers. The user only needs to provide the service domain/website.

All content lives in **Sanity CMS**. Service documents are created via the Sanity API using a migration script — no markdown files.

---

## User Input Required

**Service Domain:** `[USER TO PROVIDE]`
Example: `bloomandwild.com` or `https://www.bloomandwild.com`

---

## Execution Plan

When the user provides a domain, execute the following steps in order:

### Phase 1: Information Gathering

1. **Research the service website**
   - Use WebFetch to visit the provided domain
   - Extract: Service name, tagline, key features, pricing information, delivery options
   - Look for: About pages, delivery info, pricing pages
   - Take note of any unique selling points or certifications

2. **Create service slug**
   - Convert service name to URL-friendly slug
   - Format: lowercase, hyphens instead of spaces
   - Example: "Bloom & Wild" → `bloom-wild`

3. **Determine service positioning**
   - Based on pricing: budget, mid-range, or premium
   - Based on features: innovative, traditional, luxury, eco-friendly, etc.
   - Assign appropriate rating (4.0-4.9 based on market position)

4. **Search for and identify logo/images**
   - Find the service's logo on their website (header, footer, or about pages)
   - Find hero/banner images if available
   - Note image URLs and formats for uploading to Sanity

### Phase 2: Create Service Documents in Sanity

5. **Create migration script**
   - Path: `scripts/add-service-[slug].mjs`
   - Uses `@sanity/client` to create documents via API
   - The script creates both EN and DE documents and links translations

   Script structure:
   ```javascript
   #!/usr/bin/env node
   import { createClient } from '@sanity/client';
   import fs from 'fs';
   import path from 'path';

   const client = createClient({
     projectId: 'vm53xzke',
     dataset: 'production',
     apiVersion: '2024-01-01',
     useCdn: false,
     token: process.env.SANITY_API_TOKEN,
   });

   async function addService() {
     const slug = '[SERVICE-SLUG]';

     // 1. Upload images to Sanity
     // const logoAsset = await client.assets.upload('image',
     //   fs.createReadStream('/path/to/logo.jpg'),
     //   { filename: `${slug}-logo.jpg` }
     // );
     // Use logoAsset._id as _ref in image fields

     // 2. Create English document
     const enDoc = {
       _id: `service-en-${slug}`,
       _type: 'service',
       language: 'en',
       base: {
         id: slug,
         name: '[Service Name]',
         title: '[Service Name] Review 2025 - [Key Benefit] | Florize',
         description: '[150-160 char meta description]',
         // logo: { _type: 'image', asset: { _ref: logoAsset._id, _type: 'reference' } },
         rating: 4.5,
         priceRange: '£XX-£XX',
         deliveryOptions: ['Next Day', 'Standard'],
         keyFeatures: ['Feature 1', 'Feature 2'],
       },
       seo: {
         keywords: '[service name] review, flower delivery, ...',
         datePublished: new Date().toISOString().split('T')[0],
         dateModified: new Date().toISOString().split('T')[0],
       },
       summary: {
         bestFor: '[Best use case]',
         delivery: '[Delivery summary]',
         ratingText: '[Rating explanation]',
       },
       overview: {
         positioning: '[One sentence positioning]',
       },
       components: {
         prosTitle: 'Why We Recommend [Service Name]',
         consTitle: 'Areas for Improvement',
         pros: [
           { _key: 'p1', label: '[Benefit]', description: '[Explanation]' },
         ],
         cons: [
           { _key: 'c1', label: '[Limitation]', description: '[Explanation]' },
         ],
         faqs: [
           { _key: 'f1', question: '[Question]?', answer: '[Answer]' },
         ],
       },
       affiliate: {
         url: 'https://[service-url]',
       },
     };

     // 3. Create German document
     const deDoc = {
       _id: `service-de-${slug}`,
       _type: 'service',
       language: 'de',
       base: {
         ...enDoc.base,
         title: '[German title]',
         description: '[German description]',
         // logo and images are shared — same asset refs
       },
       seo: { ...enDoc.seo },
       summary: {
         bestFor: '[German best for]',
         delivery: '[German delivery]',
         ratingText: '[German rating text]',
       },
       overview: {
         positioning: '[German positioning]',
       },
       components: {
         prosTitle: 'Warum wir [Service Name] empfehlen',
         consTitle: 'Verbesserungspotential',
         pros: [
           { _key: 'p1', label: '[German benefit]', description: '[German explanation]' },
         ],
         cons: [
           { _key: 'c1', label: '[German limitation]', description: '[German explanation]' },
         ],
         faqs: [
           { _key: 'f1', question: '[German question]?', answer: '[German answer]' },
         ],
       },
       affiliate: enDoc.affiliate,
     };

     await client.createOrReplace(enDoc);
     console.log(`Created: ${enDoc._id}`);
     await client.createOrReplace(deDoc);
     console.log(`Created: ${deDoc._id}`);

     // 4. Create translation metadata
     const metaDoc = {
       _id: `translation.metadata.service-${slug}`,
       _type: 'translation.metadata',
       schemaTypes: ['service'],
       translations: [
         {
           _key: 'en',
           value: {
             _ref: `service-en-${slug}`,
             _type: 'reference',
             _weak: true,
             _strengthenOnPublish: { type: 'service' },
           },
         },
         {
           _key: 'de',
           value: {
             _ref: `service-de-${slug}`,
             _type: 'reference',
             _weak: true,
             _strengthenOnPublish: { type: 'service' },
           },
         },
       ],
     };
     await client.createOrReplace(metaDoc);
     console.log('Created translation metadata');

     console.log('\nDone! New service added.');
   }

   addService().catch(console.error);
   ```

6. **Fill in the script with researched content**
   - All English fields from research
   - All German translations (natural, not literal)
   - Image upload code if logo/hero images were found
   - Proper `_key` values on all array items

7. **Handle images**
   - If logo/hero image URLs were found:
     - Download images locally first
     - Upload to Sanity via `client.assets.upload('image', stream)`
     - Reference the returned asset ID in image fields
   - If images can't be downloaded:
     - Leave image fields empty (logo, heroImage)
     - Note in summary that images need to be added via Sanity Studio
   - **No images go in `/public/images/`** — all content images live in Sanity

### Phase 3: Affiliate Link Setup

8. **Add affiliate link**
   - Prompt user: "Do you have an affiliate link for [Service Name]?"
   - If yes: Include in the `affiliate.url` field of both documents
   - If no: Use direct website URL
   - Optionally add to `florizeConfig` affiliateLinks array in Sanity Studio

### Phase 4: Run Script & Validate

9. **Run the migration script**
   - Prompt user for `SANITY_API_TOKEN` (or confirm they have it set)
   - Run: `SANITY_API_TOKEN=xxx node scripts/add-service-[slug].mjs`
   - Verify output shows successful creation

10. **Build test**
    - Run `npm run build`
    - Check for errors
    - Verify service pages generate at `/en/services/[slug]` and `/de/services/[slug]`
    - Fix any issues found

11. **Development preview**
    - If dev server not running, start with `npm run dev`
    - Provide user with URLs to check:
      - English: `http://localhost:4321/en/services/[slug]`
      - German: `http://localhost:4321/de/services/[slug]`
      - Services index: `http://localhost:4321/en/services`

12. **Quality check report**
    - Create summary of what was created
    - List any assumptions made
    - Note any missing content (images, body text, content sections)
    - Highlight areas that may need editing in Sanity Studio

### Phase 5: Completion

13. **Present summary to user**
    - Service slug: `[slug]`
    - Sanity documents created:
      - ✅ `service-en-[slug]` (English)
      - ✅ `service-de-[slug]` (German)
      - ✅ `translation.metadata.service-[slug]`
    - Rating assigned: X.X/5
    - Price range: £XX-£XX
    - **Images:** Status (uploaded to Sanity / needs manual upload)
    - Affiliate link: [status]
    - URLs to review: [list]
    - **Edit in Sanity Studio:** The service can now be edited at the Sanity Studio under Content → Services

14. **Ask for improvements**
    - "Would you like me to:"
      - Add more detailed content via Sanity Studio?
      - Add testing metrics?
      - Add competitor comparisons?
      - Add content sections (features grid, assessment, pricing guide)?
      - Adjust the rating or positioning?
      - Add FAQ section?
      - Enhance SEO content?
      - Add to Quick Selection Guide (homepage recommendations)?

15. **Git commit (only if user approves)**
    - The migration script itself can be committed
    - Stage: `git add scripts/add-service-[slug].mjs`
    - Commit with message:
      ```
      Add [Service Name] to service comparison

      - Created EN/DE service documents in Sanity
      - Rating: X.X/5
      - Price range: £XX-£XX
      - [Any notable features]
      ```
    - Ask if user wants to push

---

## Content Guidelines for Claude

When creating service content:

### Rating Assignment Logic
- **4.8-4.9**: Clear market leader, exceptional service
- **4.5-4.7**: Premium service, strong reputation
- **4.2-4.4**: Solid mid-range service
- **4.0-4.1**: Budget-friendly or newer service

### Winner Badge Assignment
Only assign if service genuinely stands out:
- **"Best Overall"**: Top-rated, well-rounded service
- **"Best Value"**: Great quality-to-price ratio
- **"Most Innovative"**: Unique features or technology
- **"Premium Quality"**: High-end, luxury positioning
- Leave empty if no clear distinction

### Price Range Guidelines
- Budget: £15-£45
- Mid-range: £25-£75
- Premium: £40-£120
- Luxury: £75-£200+

### Overview Content
Write 2-4 paragraphs covering:
1. What makes this service unique
2. Key features and benefits
3. Target audience
4. Overall value proposition

### Pros Structure
Format:
- **Label**: Short, punchy benefit (2-4 words)
- **Description**: One sentence explanation

Examples:
- Label: "Fast Delivery", Description: "Next-day service available nationwide"
- Label: "Eco-Friendly", Description: "100% recyclable packaging and carbon-neutral delivery"

### Cons Structure
Be honest but constructive:
- Label: "Premium Pricing", Description: "Higher prices than budget alternatives"
- Label: "Limited Range", Description: "Smaller selection compared to larger competitors"

### SEO Best Practices
- **Title**: Include year (2025), key benefit, and brand
- **Description**: 150-160 characters, include "review" and key features
- **Keywords**: Include variations: "[name] review", "flower delivery", specific features

---

## Sanity Schema Reference

Service documents use these field groups (tabs in Sanity Studio):

| Group | Key Fields |
|-------|-----------|
| **Base Info** | id, name, title, description, logo (image), heroImage (image), rating, priceRange, winnerBadge, deliveryOptions[], keyFeatures[], founded |
| **SEO** | ogImage, keywords, datePublished, dateModified |
| **Summary** | bestFor, delivery, ratingText |
| **Overview** | positioning, content (Portable Text) |
| **Components** | prosTitle, consTitle, pros[], cons[], faqs[], testingMetrics[], bestForScenarios[], featureComparison |
| **Affiliate** | url, promoCode (code, description, expiryDate) |
| **Comparisons** | items[] (competitor, category, description), useCases |
| **Recommendations** | sections[] (heading, content), cta |
| **Related** | heading, reviews[] (title, serviceId, description) |
| **Content** | contentSections[] (11 section types), body (Portable Text) |

All array items require unique `_key` values (e.g., `p1`, `c1`, `f1`).

---

## Error Handling

### Website Not Accessible
- Inform user and ask for basic information
- Request: service name, key features, pricing
- Proceed with available information

### Script Errors
- Check Sanity API token is valid
- Verify document structure matches schema
- Common fixes:
  - Missing `_key` on array items
  - Invalid image reference format
  - Missing required fields (base.id, base.name, base.title, base.description, base.rating, base.priceRange)

### Translation Issues
- Use natural language, not literal translation
- Keep technical terms in English if standard (e.g., "B Corp")
- Maintain marketing tone appropriate for German market

### Image Upload Issues
- If upload fails, leave image fields empty
- User can upload images directly in Sanity Studio (drag & drop)
- Note missing images in the summary

---

## Completion Checklist

Before marking as complete:

- [ ] English service document created in Sanity
- [ ] German service document created in Sanity
- [ ] Translation metadata links EN ↔ DE documents
- [ ] `base.id` is a valid URL slug
- [ ] Rating between 4.0-4.9
- [ ] Price range in correct format
- [ ] At least 3 pros and 3 cons defined
- [ ] Overview positioning written
- [ ] SEO fields completed (keywords, dates)
- [ ] Affiliate URL or website link set
- [ ] Build test passes successfully
- [ ] Dev server shows pages correctly
- [ ] Summary report provided to user

---

## Example Execution Flow

```
User: "Add petalpost.co.uk"

Claude:
1. ✓ Fetching website information...
2. ✓ Found logo at: https://www.petalpost.co.uk/logo.png
3. ✓ Creating service slug: "petal-post"
4. ✓ Analyzing service positioning: Mid-range, fast delivery focus
5. ✓ Creating migration script: scripts/add-service-petal-post.mjs
6. ✓ Running script...
7. ✓ Created: service-en-petal-post
8. ✓ Created: service-de-petal-post
9. ✓ Created: translation.metadata.service-petal-post
10. ✓ Running build test... Build successful!

Summary:
- Service: Petal Post
- Slug: petal-post
- Rating: 4.3/5 (mid-range, reliable service)
- Price Range: £20-£70
- Sanity Documents:
  - ✅ service-en-petal-post
  - ✅ service-de-petal-post
  - ✅ translation.metadata.service-petal-post
- Images: Logo uploaded to Sanity
- Edit in Sanity Studio: Content → Services → Petal Post

Review at:
- http://localhost:4321/en/services/petal-post
- http://localhost:4321/de/services/petal-post

Would you like me to:
1. Add content sections (features grid, assessment)?
2. Add competitor comparisons?
3. Commit the migration script?
```

---

## Notes for Claude Execution

- **Be proactive**: Don't ask for every detail; make reasonable assumptions based on website research
- **Be thorough**: Complete all content fields, don't leave placeholders like "TODO"
- **Be accurate**: Use real information from website research, not made-up data
- **Be helpful**: Provide clear summary and next steps
- **Be efficient**: Create both language documents in a single script run
- **Be quality-focused**: Write compelling, SEO-friendly content that matches the site's existing tone
- **Remember**: All content lives in Sanity — never create markdown files in `src/content/`

The goal is to create a complete, publication-ready service addition with minimal user input.
