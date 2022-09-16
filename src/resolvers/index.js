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
      const postFetched = await Post.findById(_id).populate("comment");
      return {
        ...postFetched._doc,
        _id: postFetched.id,
        createdAt: new Date(postFetched._doc.createdAt).toISOString(),
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

  addComment: async (args) => {
    console.log("qq", args);
    try {
      const { text, post } = args.Comment;
      const comment = new Comment({
        text,
        post,
      });
      const newComment = await comment.save();
      return { ...newComment._doc, _id: newComment.id };
    } catch (error) {
      throw error;
    }
  },
};
