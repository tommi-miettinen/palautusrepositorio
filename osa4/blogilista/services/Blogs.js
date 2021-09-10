import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const deleteBlog = async (blogId, userId) => {
  const blog = await Blog.findById({ _id: blogId });
  if (userId !== blog.user.toString()) throw new Error("Not Authorized");
  await Blog.deleteOne({ _id: blogId, user: userId });
};

export const findBlogs = async () => {
  const blogs = await Blog.find({}).populate("user");
  return blogs;
};

export const addBlog = async (data, userId) => {
  const blog = new Blog(data);
  if (!blog.title || !blog.url) throw new Error("Invalid blog title or url");
  if (!blog.likes) blog.likes = 0;
  const user = await User.findById(userId);
  blog.user = user.id;
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();
  return result;
};

export const updateBlog = async (blogId, data) => {
  //prettier-ignore
  const result = await Blog.findByIdAndUpdate({ _id: blogId }, data, { new:true })
  if (!result) throw new Error("Not Found");
  return result;
};
