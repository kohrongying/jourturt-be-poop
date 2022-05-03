const fastify = require('fastify')({
  logger: true
})
const port = 3000;

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen(port, '0.0.0.0', error => {
  if (error) {
    fastify.log.error(error)
    process.exit(1)
  }
  // Server is now listening on ${address}
})