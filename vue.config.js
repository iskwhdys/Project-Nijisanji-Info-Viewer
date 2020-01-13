var Path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = {
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new PrerenderSpaPlugin(
        // Absolute path to compiled SPA
        Path.join(__dirname, 'html'),
        // List of routes to prerender
        [ '/', '/ranking', '/manager' ]
      )
    ]
  },
  
  outputDir: 'html',
  
};