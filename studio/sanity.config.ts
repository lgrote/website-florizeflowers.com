import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { documentInternationalization } from "@sanity/document-internationalization";

import { schemaTypes } from "./schemas";
import { structure } from "./structure";

export default defineConfig({
  name: "florize-flowers-cms",
  title: "Florize Flowers CMS",

  projectId: "vm53xzke",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    codeInput(),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "de", title: "German" },
      ],
      schemaTypes: [
        "service",
        "occasion",
        "guide",
        "page",
        "update",
        "homepageSection",
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
