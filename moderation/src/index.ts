import { app } from './app';

const start = () => {
  app.listen(3000, () => {
    console.log('Moderation service listening on port 3000');
  });
};

start();
