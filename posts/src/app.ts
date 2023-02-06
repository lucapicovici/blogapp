import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import { getPostsRouter } from './routes/show';
import { createPostRouter } from './routes/new';
import { eventsRouter } from './routes/events';
import { errorHandler, NotFoundError } from '@iceydc-projects/common';

const app = express();
app.use(json());

app.use(getPostsRouter);
app.use(createPostRouter);
app.use(eventsRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
