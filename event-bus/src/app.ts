import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import axios from 'axios';
import { NotFoundError } from '@iceydc-projects/common';

const app = express();
app.use(json());

const events: string[] = [];

app.post('/api/event-bus/events', (req: Request, res: Response) => {
  const event = req.body;

  events.push(event);

  // Posts service
  axios.post('http://posts-srv:3000/api/posts/events', event).catch((err) => {
    console.log(err.message);
  });
  // Comments
  axios
    .post('http://comments-srv:3000/api/comments/events', event)
    .catch((err) => {
      console.log(err.message);
    });

  res.send({ status: 'OK' });
});

app.get('/api/event-bus/events', (req: Request, res: Response) => {
  res.send(events);
});

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

export { app };
