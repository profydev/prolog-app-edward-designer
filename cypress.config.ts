import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "6jco2i",
  retries: {
    runMode: 2,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
