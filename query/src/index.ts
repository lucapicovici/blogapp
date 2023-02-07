import { app } from './app';
import axios from 'axios';
import { handleEvent } from './app';

const start = () => {
  app.listen(3000, async () => {
    console.log('Query service listening on port 3000');

    try {
      const response = await axios.get(
        'http://event-bus-srv:3000/api/event-bus/events'
      );

      for (let event of response.data) {
        console.log('Processing event:', event.type);

        handleEvent(event.type, event.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  });
};

start();
