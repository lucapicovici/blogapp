import express, { Request, Response } from 'express';
import axios from 'axios';
import { Comment } from '../models/comment';

const router = express.Router();

router.post('/api/comments/events', async (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;

    const comment = await Comment.findById(id);

    if (!comment) return res.status(400).send({ err: 'Comment not found' });

    comment.status = status;
    await comment.save();

    await axios
      .post('http://event-bus-srv:3000/api/event-bus/events', {
        type: 'CommentUpdated',
        data: {
          id,
          status,
          postId,
          content,
        },
      })
      .catch((err) => console.error(err.message));
  }

  res.send({});
});

export { router as eventsRouter };
