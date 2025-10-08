import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'florizeConfig',
  title: 'Florize Flowers - Config',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Florize Flowers Configuration',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // AFFILIATE LINKS SECTION
    defineField({
      name: 'affiliateLinks',
      title: 'Flower Service Affiliate Links',
      type: 'array',
      description: 'Manage affiliate links and banners for flower delivery services. If no affiliate link exists, the service website from content files will be used automatically.',
      of: [
        {
          type: 'object',
          title: 'Affiliate Link',
          fields: [
            defineField({
              name: 'serviceId',
              title: 'Service',
              type: 'string',
              description: 'Select the flower delivery service for this affiliate link',
              options: {
                list: [
                  {title: 'Interflora', value: 'interflora'},
                  {title: 'Bloom & Wild', value: 'bloom-wild'},
                  {title: 'Flowerbx', value: 'flowerbx'},
                  {title: 'Appleyard Flowers', value: 'appleyard-flowers'},
                  {title: 'Serenata Flowers', value: 'serenata-flowers'},
                  {title: 'Prestige Flowers', value: 'prestige-flowers'},
                  {title: 'Flying Flowers', value: 'flying-flowers'},
                  {title: 'Next Flowers', value: 'next-flowers'},
                  {title: 'MyFlowers', value: 'myflowers'},
                  {title: 'Wild at Heart', value: 'wild-at-heart'},
                  {title: 'Real Flower Company', value: 'real-flower-company'},
                  {title: 'Blossoming Gifts', value: 'blossoming-gifts'},
                ],
                layout: 'dropdown'
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'locale',
              title: 'Locale',
              type: 'string',
              description: 'Language/locale for this affiliate link (leave empty for all locales)',
              options: {
                list: [
                  {title: 'All Locales (default)', value: ''},
                  {title: 'English', value: 'en'},
                  {title: 'German', value: 'de'},
                ],
                layout: 'dropdown'
              },
              initialValue: '',
            }),
            defineField({
              name: 'affiliateUrl',
              title: 'Affiliate URL',
              type: 'url',
              description: 'Full affiliate tracking URL with your partner ID',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https']
              }),
            }),
            defineField({
              name: 'banner',
              title: 'Affiliate Banner',
              type: 'object',
              description: 'Optional affiliate banner HTML code from your affiliate network. Leave empty if no banner available.',
              fields: [
                defineField({
                  name: 'code',
                  title: 'Banner HTML Code',
                  type: 'text',
                  description: 'Paste the complete HTML code from your affiliate network (including <a> and <img> tags)',
                  rows: 8,
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  description: 'Optional description for internal reference (e.g., "728x90 leaderboard banner")',
                }),
                defineField({
                  name: 'enabled',
                  title: 'Show Banner',
                  type: 'boolean',
                  description: 'Toggle to show/hide banner on website',
                  initialValue: true,
                }),
              ],
            }),
            defineField({
              name: 'notes',
              title: 'Notes',
              type: 'text',
              description: 'Optional notes about this affiliate partnership (e.g., commission rate, network)',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              serviceId: 'serviceId',
              url: 'affiliateUrl',
              locale: 'locale',
              notes: 'notes',
            },
            prepare({serviceId, url, locale, notes}) {
              const localeLabel = locale ? ` [${locale}]` : ' [all locales]';
              return {
                title: `${serviceId || 'Untitled'}${localeLabel}`,
                subtitle: notes || url || 'No URL',
              }
            },
          },
        },
      ],
    }),

    // GLOBAL HEADER TAGS SECTION
    defineField({
      name: 'globalHeaderTags',
      title: 'Global Header Tags',
      type: 'array',
      description: 'HTML tags that will be included in the <head> section of every page (analytics, tracking pixels, etc.)',
      of: [
        {
          type: 'object',
          title: 'HTML Tag',
          fields: [
            defineField({
              name: 'tag',
              title: 'HTML Tag',
              type: 'code',
              options: {
                language: 'html',
                languageAlternatives: [
                  {title: 'HTML', value: 'html'},
                  {title: 'JavaScript', value: 'javascript'},
                ],
              },
              description: 'Complete HTML tag (e.g., <script>...</script> or <meta .../>)',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Optional description of what this tag does (for your reference)',
            }),
            defineField({
              name: 'active',
              title: 'Active',
              type: 'boolean',
              description: 'Uncheck to disable this tag without deleting it',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              tag: 'tag.code',
              description: 'description',
              active: 'active',
            },
            prepare({tag, description, active}) {
              // Extract tag type from HTML for preview
              const tagMatch = tag?.match(/<(\w+)/)
              const tagType = tagMatch ? tagMatch[1] : 'HTML'

              return {
                title: description || `${tagType} tag`,
                subtitle: active !== false ? '✅ Active' : '❌ Disabled',
                media: active !== false ? '🏷️' : '🚫',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lastUpdated: 'lastUpdated',
      affiliateLinks: 'affiliateLinks',
      headerTags: 'globalHeaderTags',
    },
    prepare({title, lastUpdated, affiliateLinks, headerTags}) {
      const linkCount = Array.isArray(affiliateLinks) ? affiliateLinks.length : 0;
      const activeTagCount = headerTags?.filter((tag: any) => tag.active !== false)?.length || 0;
      const totalTagCount = headerTags?.length || 0;

      return {
        title: title || 'Florize Flowers Configuration',
        subtitle: `${linkCount} affiliate links • ${activeTagCount}/${totalTagCount} header tags active ${lastUpdated ? `• Updated: ${new Date(lastUpdated).toLocaleDateString()}` : ''}`,
      }
    },
  },
})
