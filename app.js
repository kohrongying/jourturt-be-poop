import fastify from 'fastify'

const build = (opts={}) => {
  const app = fastify(opts)

  // Declare a route
  app.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  return app
}

export default build