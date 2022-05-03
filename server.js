const server = require('./app')({
  logger: {
    level: 'info',
    prettyPrint: true
  }
})

const port = 3000;
const address = '0.0.0.0';

server.listen(port, address, (err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})