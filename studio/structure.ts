import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Services')
        .schemaType('service')
        .child(
          S.documentTypeList('service')
            .title('Services')
            .defaultOrdering([{ field: 'base.name', direction: 'asc' }])
        ),
      S.listItem()
        .title('Occasions')
        .schemaType('occasion')
        .child(
          S.documentTypeList('occasion')
            .title('Occasions')
            .defaultOrdering([{ field: 'base.name', direction: 'asc' }])
        ),
      S.listItem()
        .title('Guides')
        .schemaType('guide')
        .child(
          S.documentTypeList('guide')
            .title('Guides')
            .defaultOrdering([{ field: 'category', direction: 'asc' }])
        ),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Homepage Sections')
        .schemaType('homepageSection')
        .child(
          S.documentTypeList('homepageSection')
            .title('Homepage Sections')
            .defaultOrdering([{ field: 'sectionType', direction: 'asc' }])
        ),
      S.listItem()
        .title('Updates')
        .schemaType('update')
        .child(
          S.documentTypeList('update')
            .title('Updates')
            .defaultOrdering([{ field: 'publishedDate', direction: 'desc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Configuration')
        .schemaType('florizeConfig')
        .child(
          S.document()
            .schemaType('florizeConfig')
            .documentId('a26e9fd0-b343-425c-b7a3-b3a039d06973')
        ),
    ]);
