import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/posts/events', (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

export { router as eventsRouter };
