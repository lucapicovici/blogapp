import express, { Request, Response } from 'express';
import { json } from 'body-parser';

import { getCommentsRouter } from './routes/show';
import { postCommentsRouter } from './routes/new';
import { errorHandler, NotFoundError } from '@iceydc-projects/common';

const app = express();
app.use(json());

app.use(getCommentsRouter);
app.use(postCommentsRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
