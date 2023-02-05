import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { Post } from '../models/post';

const router = express.Router();

router.post('/api/posts', async (req: Request, res: Response) => {
  const { title } = req.body;

  const post = Post.build({ title });
  await post.save();

  res.send(post).status(201);
});

export { router as createPostRouter };
