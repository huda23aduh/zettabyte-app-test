const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
