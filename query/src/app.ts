import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import axios from 'axios';
import { NotFoundError } from '@iceydc-projects/common';

const app = express();
app.use(json());

const posts: any = {};

export const handleEvent = (type: string, data: any) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment: { id: any }) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get('/api/query/posts', (req, res) => {
  res.send(posts);
});

app.post('/api/query/events', (req, res) => {
  const { type, data } = req.body;
  console.log('Received event', type);

  handleEvent(type, data);

  res.send({});
});

app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});

export { app };
