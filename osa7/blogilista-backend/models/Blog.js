import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [String],
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.user.blogs;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
