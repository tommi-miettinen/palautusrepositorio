import Blog from "../models/Blog.js";

export const create = async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};

export const findAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (err) {
    next(err);
  }
};
