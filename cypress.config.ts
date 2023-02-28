import { defineConfig } from "cypress";

const cypressJsonConfig = {

  fileServerFolder: ".",
  fixturesFolder: "./cypress/fixtures",
  video: false,
  videosFolder: "../../dist/cypress/e2e/videos",
  screenshotsFolder: "../../dist/cypress/e2e/screenshots",
  chromeWebSecurity: false,
  viewportWidth: 1300,
  viewportHeight: 900,
  watchForFileChanges: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  responseTimeout: 30000,
  waitToLoad: 7000,
  requestTimeout: 10000,
  
  retries: 0,
  env: {
    environment: "local",
    baseUrl: "http://localhost:8080/",
   apiTimeout: "25000",



  },
  specPattern: "cypress/**/**/*.cy.{js,jsx,ts,tsx}",
  supportFile: "cypress/support/e2e.ts",
 
};
export default defineConfig({
  e2e: {

    ...cypressJsonConfig,
  },


});

