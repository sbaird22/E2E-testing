import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: false,
     indexHtmlFile: "cypress/support/component-index.html",
  },
  e2e: {
    baseUrl: "http://localhost:3001", 
    supportFile: false,
  },
});
