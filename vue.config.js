// var Path = require('path')
// var PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  outputDir: 'html',
  // configureWebpack: {
  //   devtool: "source-map",
  //   plugins: [
  //     new PrerenderSpaPlugin(
  //       Path.join(__dirname, 'html'),
  //       ['/', '/broadcasters']
  //     )
  //   ],
  // },

};