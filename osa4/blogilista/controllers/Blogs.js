import * as blogService from "../services/Blogs.js";

export const create = async (req, res) => {
  const data = req.body;
  const userId = req.user;
  const result = await blogService.addBlog(data, userId);
  res.status(201).send(result);
};

export const remove = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user;
  await blogService.deleteBlog(blogId, userId);
  res.send(200);
};

export const getAll = async (req, res) => {
  const blogs = await blogService.findBlogs();
  res.send(blogs);
};

export const updateOne = async (req, res) => {
  const blog = req.body;
  const blogId = req.params.id;
  const result = await blogService.updateBlog(blogId, blog);
  res.send(result);
};
