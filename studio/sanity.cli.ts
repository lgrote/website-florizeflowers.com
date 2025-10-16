import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "vm53xzke",
    dataset: "production",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  deployment: {
    appId: "w2fg8j2ysn7kpu02g82cdqmy",
  },
});
