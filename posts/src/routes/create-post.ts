import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Post } from '../models/post';
import { validateRequest } from '@iceydc-projects/common';

const router = express.Router();

router.post(
  '/api/posts',
  [
    body('title')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const post = Post.build({ title });
    await post.save();

    res.send(post).status(201);
  }
);

export { router as createPostRouter };