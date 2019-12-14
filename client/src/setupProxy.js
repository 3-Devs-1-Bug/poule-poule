/**
 * This file is only used when running the dev server.
 * It allows proxying every request starting with "/api" to the locally
 * running dotnet server.
 */

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: process.env.API_URL,
      ws: true, // proxy websockets
      pathRewrite: {
        // remove the "/api" prefix. e.g "/api/games/123" => "/games/123"
        '^/api': ''
      }
    })
  )
}
