import mongoose from 'mongoose';

// An interface that describes the properties that are required
// to create a new Comment
interface CommentAttrs {
  content: string;
  postId: string;
  status: string;
}

// An interface that describes the properties
// that a Comment Model has
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

// An interface that describes the properties
// that a Comment Document has
interface CommentDoc extends mongoose.Document {
  content: string;
  postId: string;
  status: string;
  updatedAt: string;
}

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  commentSchema
);

export { Comment };
