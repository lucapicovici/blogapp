import { app } from './app';

const start = () => {
  app.listen(3000, () => {
    console.log('Event-bus service listening on port 3000');
  });
};

start();
