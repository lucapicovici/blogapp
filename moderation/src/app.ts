import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import axios from 'axios';

const app = express();
app.use(json());

app.post('/api/moderation/events', async (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:3000/api/event-bus/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

export { app };
