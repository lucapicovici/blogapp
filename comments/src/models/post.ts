import mongoose from 'mongoose';

// An interface that describes the properties that are required
// to create a new Post
interface PostAttrs {
  title: string;
}

// An interface that describes the properties
// that a Post Model has
interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

// An interface that describes the properties
// that a Post Document has
interface PostDoc extends mongoose.Document {
  title: string;
  updatedAt: string;
}

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };
