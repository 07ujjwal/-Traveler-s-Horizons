const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    photo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    city: { type: Schema.Types.ObjectId, ref: "City" },
  },
  { timestamps: true }
);

const Post = model("Posts", PostSchema);

module.exports = Post;
