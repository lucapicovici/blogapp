import express, { Request, Response } from 'express';
import axios from 'axios';
import { validateRequest } from '@iceydc-projects/common';
import { body } from 'express-validator';
import { Comment } from '../models/comment';

const router = express.Router();

router.post(
  '/api/comments/:postId/comments',
  [
    body('content')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Comment content must be between 1 and 100 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { content } = req.body;

    const comment = {
      content,
      postId: req.params.postId,
      status: 'pending',
    };

    const createdComment = Comment.build(comment);
    await createdComment.save();

    await axios
      .post('http://event-bus-srv:3000/api/event-bus/events', {
        type: 'CommentCreated',
        data: {
          id: createdComment._id,
          content,
          postId: req.params.postId,
          status: 'pending',
        },
      })
      .catch((err) => {
        console.log(err.message);
      });

    res.status(201).send(createdComment);
  }
);

export { router as postCommentsRouter };
