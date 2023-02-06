import express, { Request, Response } from 'express';
import { Comment } from '../models/comment';

const router = express.Router();

router.get(
  '/api/comments/:postId/comments',
  async (req: Request, res: Response) => {
    const comments = await Comment.find({ postId: req.params.postId });

    res.status(200).send(comments);
  }
);

export { router as getCommentsRouter };
