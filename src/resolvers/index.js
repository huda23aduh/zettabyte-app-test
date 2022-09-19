const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = {
  posts: async () => {
    try {
      const postsFetched = await Post.find();
      return postsFetched.map((post) => {
        return {
          ...post._doc,
          _id: post.id,
          createdAt: new Date(post._doc.createdAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  post: async (_id) => {
    try {
      const postFetched = await Post.findById(_id).populate("comments");

      return {
        ...postFetched._doc,
        _id: postFetched.id,
        title: postFetched.title,
        body: postFetched.body,
        createdAt: new Date(postFetched._doc.createdAt).toISOString(),
        updatedAt: new Date(postFetched._doc.updatedAt).toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },

  createPost: async (args) => {
    try {
      const { title, body } = args.Post;
      const post = new Post({
        title,
        body,
      });
      const newPost = await post.save();
      return { ...newPost._doc, _id: newPost.id };
    } catch (error) {
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(id);
      return {
        ...deletedPost._doc,
        _id: deletedPost.id,
        createdAt: new Date(deletedPost._doc.createdAt).toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },

  updatePost: async (args) => {
    try {
      const { _id, title, body } = args;
      const updatedPost = await Post.findByIdAndUpdate(_id, {
        title: title,
        body: body,
      });
      return `Post ${updatedPost.id} updated Successfully!!!`;
    } catch (error) {
      throw error;
    }
  },

  commentsOfAPost: async (_id) => {
    try {
      const postsFetched = await Comment.find({ post: _id });

      return postsFetched.map((item) => {
        return {
          ...item._doc,
          _id: item.id,
          text: item.text,
          postId: item.post,
          createdAt: new Date(item._doc.createdAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  addComment: async (args) => {
    try {
      const { text, postId } = args.Comment;

      const comment = new Comment({
        text,
        postId,
      });
      const newComment = await comment.save();

      Post.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment._id } },
        { new: true, useFindAndModify: false }
      )
        .then((docs) => {
          if (docs) {
            // resolve({ success: true, data: docs });
          } else {
            // reject({ success: false, data: "no such user exist" });
          }
        })
        .catch((err) => {
          //   reject(err);
        });

      return { ...newComment._doc, _id: newComment.id };
    } catch (error) {
      throw error;
    }
  },

  updateComment: async (args) => {
    try {
      const { _id, text } = args;
      const updatedComment = await Comment.findByIdAndUpdate(_id, {
        text: text,
      });
      return `Post ${updatedComment.id} updated Successfully!!!`;
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (id) => {
    try {
      const postData = await Post.findOne({
        comments: id,
      })
        .then((postItem) => {
          if (postItem) return postItem;
          else return `unknown commentId or article not found`;
        })
        .catch((err) => {
          console.log("err", err);
          //   reject(err);
        });

      await Post.updateOne(
        { _id: postData._id },
        { $pull: { comments: id._id } },
        { new: true }
      );

      await Comment.findByIdAndDelete(id._id);
      return `Comment deleted Successfully!!!`;
    } catch (error) {
      throw error;
    }
  },
};
