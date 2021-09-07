import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const create = async (req, res) => {
  const blog = new Blog(req.body);
  if (!blog.title || !blog.url) return res.send(400);
  if (!blog.likes) blog.likes = 0;
  blog.user = ["613742b3aa7faa49f08f5a9b"];
  const result = await blog.save();
  console.log(result);
  res.status(201).send(result);
};

export const deleteOne = async (req, res) => {
  const { id } = req.params;
  const result = await Blog.deleteOne({ _id: id });
  if (!result.deletedCount) return res.send(404);
  res.send(200);
};

export const findAll = async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.send(blogs);
};

export const updateOne = async (req, res) => {
  const { id } = req.params;
  //prettier-ignore
  const result = await Blog.findByIdAndUpdate({ _id: id }, req.body, { new:true })
  if (!result) return res.send(404);
  res.send(result);
};
