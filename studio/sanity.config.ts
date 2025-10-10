import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";

// Import schemas from root-level schemas directory
import { schemaTypes } from "../schemas";

export default defineConfig({
  name: "florize-flowers-cms",
  title: "Florize Flowers CMS",

  projectId: "vm53xzke",
  dataset: "production",

  plugins: [structureTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
