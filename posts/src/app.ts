import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import { getPostsRouter } from './routes/get-posts';
import { createPostRouter } from './routes/create-post';

const app = express();
app.use(json());

app.use(getPostsRouter);
app.use(createPostRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new Error('Not Found');
});

export { app };
