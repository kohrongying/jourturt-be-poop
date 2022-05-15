import server from './app.js';

const customServer = server({
  logger: {
    level: 'info',
    prettyPrint: true
  }
})

const port = 3000;
const address =  process.env.SERVER_ADDRESS || 'localhost';

customServer.listen(port, address, (err) => {
  if (err) {
    customServer.log.error(err)
    process.exit(1)
  }
})