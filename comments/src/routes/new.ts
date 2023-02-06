import express, { Request, Response } from 'express';
import { Comment } from '../models/comment';

const router = express.Router();

router.post(
  '/api/comments/:postId/comments',
  async (req: Request, res: Response) => {
    const { content } = req.body;

    const comment = {
      content,
      postId: req.params.postId,
      status: 'pending',
    };

    const createdComment = Comment.build(comment);
    await createdComment.save();

    console.log(createdComment);
    res.status(201).send(createdComment);
  }
);

export { router as postCommentsRouter };
