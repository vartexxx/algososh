import {defineConfig} from "cypress";
import {BASE_URL} from "./src/constants/routes";


export default defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: any): void {
      // implement node event listeners here
    },
    baseUrl: BASE_URL,
  },
});
