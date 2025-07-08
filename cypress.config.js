// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: true,
    json: true,
    reportDir: "cypress/reports/html",
  },
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({ plugins: [createEsbuildPlugin.default(config)] }));
      config.env.stepDefinitions = "cypress/e2e/step_definitions/login_add_user_steps.js";
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
