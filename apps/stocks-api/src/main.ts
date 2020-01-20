import { Server } from 'hapi';
import { Constants } from './app/app.constants'
import { stockController } from './app/stock.controller';
import { Routes } from './app/app.routes';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  // save server object to utilize in controller
  Constants.SERVER = server;
  
  // initialize controller for caching settings
  stockController.init();

  // set routes of server
  server.route(Routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();