# Automated Service Addition Plan

This is an executable plan for Claude to add a new flower delivery service to Florize Flowers. The user only needs to provide the service domain/website.

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

4. **Search for existing logo/images**
   - Look for high-quality logo on their website
   - Note the logo URL for potential download
   - Check if service already has images in `/public/images/`

### Phase 2: File Creation

5. **Create English service file**
   - Path: `src/content/services/en/[slug].md`
   - Use the template structure from ADDING_A_NEW_SERVICE.md
   - Fill in all discovered information:
     - `base.id`: Use the created slug
     - `base.name`: Official service name
     - `base.title`: "Service Name Review 2025 - [Key Benefit] | Florize"
     - `base.description`: Write compelling 150-160 character meta description
     - `base.logo_path`: Use placeholder or existing image path
     - `base.rating`: Assign based on market position (4.0-4.9)
     - `base.price_range`: Based on research (format: "£XX-£XX")
     - `base.delivery_options`: List 2-3 key delivery options
     - `base.key_features`: List 2-3 standout features
     - `base.winner_badge`: If applicable (Best Value, Most Innovative, etc.)
   - Write complete overview content (2-4 paragraphs)
   - Create pros and cons (3-5 each with descriptions)
   - Add SEO keywords
   - Set date_published and date_modified to today's date
   - Write main markdown content (minimum 200 words)

6. **Create German service file**
   - Path: `src/content/services/de/[slug].md`
   - Translate ALL content from English version
   - Keep same: `base.id`, image paths, affiliate URL, dates
   - Translate: title, description, features, content, pros/cons
   - Ensure natural German translations, not literal

7. **Handle service images**
   - Check if images exist in `/public/images/` for this service
   - If not, identify which existing placeholder images to use
   - Options: `service-professional-1.jpg` through `service-professional-9.jpg`
   - Select an unused or appropriate placeholder
   - Document which image was assigned in the service file

### Phase 3: Affiliate Link Setup

8. **Add affiliate link**
   - Prompt user: "Do you have an affiliate link for [Service Name]?"
   - If yes: Add to Sanity CMS (guide user through Sanity Studio)
   - If no: Use direct website URL in `affiliate.url` field
   - Format URL properly (include https://, no trailing slash unless needed)

### Phase 4: Testing & Validation

9. **Validate file syntax**
   - Read both service files
   - Check YAML frontmatter is valid
   - Verify all required fields present
   - Ensure `base.id` matches filename

10. **Build test**
    - Run `npm run build`
    - Check for errors
    - Verify service pages generate
    - Fix any issues found

11. **Development preview**
    - If dev server not running, start with `npm run dev`
    - Wait for server to be ready
    - Provide user with URLs to check:
      - English: `http://localhost:4321/en/services/[slug]`
      - German: `http://localhost:4321/de/services/[slug]`
      - Services index: `http://localhost:4321/en/services`
      - Homepage (if rating is top 5): `http://localhost:4321/en`

12. **Quality check report**
    - Create summary of what was created
    - List any assumptions made
    - Note any placeholder content or images used
    - Highlight areas that may need user refinement

### Phase 5: Completion

13. **Present summary to user**
    - Service slug created: `[slug]`
    - Files created:
      - ✅ English service file
      - ✅ German service file
    - Rating assigned: X.X/5
    - Price range: £XX-£XX
    - Image used: [path]
    - Affiliate link: [status]
    - URLs to review: [list]

14. **Ask for improvements**
    - "Would you like me to:"
      - Add more detailed content?
      - Add testing metrics?
      - Add competitor comparisons?
      - Adjust the rating or positioning?
      - Create a custom logo/image? (user would need to provide)
      - Add FAQ section?
      - Enhance SEO content?

15. **Git commit (only if user approves)**
    - Wait for user confirmation
    - Stage files: `git add src/content/services/en/[slug].md src/content/services/de/[slug].md`
    - Commit with message:
      ```
      Add [Service Name] to service comparison

      - Add English and German service pages
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

## Error Handling

If issues occur during execution:

### Website Not Accessible
- Inform user and ask for basic information
- Request: service name, key features, pricing
- Proceed with available information

### Build Errors
- Read error message carefully
- Common fixes:
  - YAML syntax: Check indentation, quotes, colons
  - Missing fields: Add required fields
  - Invalid characters: Escape special characters in strings
- Fix and retry build

### Translation Issues
- Use natural language, not literal translation
- Keep technical terms in English if standard (e.g., "B Corp")
- Maintain marketing tone appropriate for German market

### Image Not Found
- Fall back to placeholder: `service-professional-[1-9].jpg`
- Choose based on service type:
  - 1-3: Traditional/classic
  - 4-6: Modern/innovative
  - 7-9: Luxury/premium
- Document choice for user

---

## Completion Checklist

Before marking as complete:

- [ ] English service file created with complete content
- [ ] German service file created with full translation
- [ ] Both files have valid YAML frontmatter
- [ ] `base.id` matches filename in both files
- [ ] Rating between 4.0-4.9
- [ ] Price range in correct format
- [ ] At least 3 pros and 3 cons defined
- [ ] Overview content written (minimum 150 words)
- [ ] Main markdown content written (minimum 200 words)
- [ ] SEO fields completed
- [ ] Image paths valid
- [ ] Affiliate URL or website link added
- [ ] Build test passes successfully
- [ ] Dev server shows pages correctly
- [ ] Summary report provided to user

---

## Example Execution Flow

```
User: "Add petalpost.co.uk"

Claude:
1. ✓ Fetching website information...
2. ✓ Creating service slug: "petal-post"
3. ✓ Analyzing service positioning: Mid-range, fast delivery focus
4. ✓ Creating English service file...
5. ✓ Creating German service file...
6. ✓ Assigning placeholder image: service-professional-4.jpg
7. ✓ Running build test...
8. ✓ Build successful!
9. ✓ Starting dev server...

Summary:
- Service: Petal Post
- Slug: petal-post
- Rating: 4.3/5 (mid-range, reliable service)
- Price Range: £20-£70
- Files Created: ✓ en/petal-post.md, ✓ de/petal-post.md
- Image: /images/service-professional-4.jpg

Review at:
- http://localhost:4321/en/services/petal-post
- http://localhost:4321/de/services/petal-post

Would you like me to:
1. Add more detailed testing metrics?
2. Add competitor comparisons?
3. Commit these changes?
```

---

## Notes for Claude Execution

- **Be proactive**: Don't ask for every detail; make reasonable assumptions based on website research
- **Be thorough**: Complete all content sections, don't leave placeholders like "TODO" or "Content here"
- **Be accurate**: Use real information from website research, not made-up data
- **Be helpful**: Provide clear summary and next steps
- **Be efficient**: Run steps in parallel where possible (e.g., create both language files simultaneously)
- **Be quality-focused**: Write compelling, SEO-friendly content that matches the site's existing tone

The goal is to create a complete, publication-ready service addition with minimal user input.
