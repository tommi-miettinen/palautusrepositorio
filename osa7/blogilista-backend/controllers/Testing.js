import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const reset = async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  res.send(204);
};
