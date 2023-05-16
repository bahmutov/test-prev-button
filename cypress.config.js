const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'https://www.ncbi.nlm.nih.gov',
    supportFile: false,
    fixturesFolder: false,
    blockHosts: ['www.google-analytics.com', 'siteintercept.qualtrics.com'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
  },
})
