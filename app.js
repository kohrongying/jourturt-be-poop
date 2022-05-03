const fastify = require('fastify')

const build = (opts={}) => {
  const app = fastify(opts)

  // Declare a route
  app.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  return app
}

module.exports = build