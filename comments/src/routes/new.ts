import express, { Request, Response } from 'express';
import { Comment } from '../models/comment';
import axios from 'axios';

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

    await axios.post('http://event-bus-srv:3000/api/event-bus/events', {
      type: 'CommentCreated',
      data: {
        id: createdComment._id,
        content,
        postId: req.params.postId,
        status: 'pending',
      },
    });

    res.status(201).send(createdComment);
  }
);

export { router as postCommentsRouter };
