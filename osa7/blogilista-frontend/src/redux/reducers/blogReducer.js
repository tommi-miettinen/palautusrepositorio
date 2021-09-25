import blogService from "../../services/blogs";

export const like = (blog) => {
  const user = blog.user;
  delete blog.user;
  blog.likes = blog.likes + 1;
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
    });
    updatedBlog.user = user;
    dispatch({
      type: "LIKE",
      data: updatedBlog,
    });
  };
};

export const addBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);
    dispatch({
      type: "ADD",
      data: blog,
    });
  };
};

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log(blogs);
    dispatch({
      type: "GET_BLOGS",
      data: blogs,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch({
      type: "DELETE",
      data: { id: blog.id },
    });
  };
};

export const addComment = (blog, comment) => {
  const user = blog.user;
  delete blog.user;
  const editedBlog = { ...blog, comments: blog.comments.concat(comment) };
  return async (dispatch) => {
    const result = await blogService.update(editedBlog.id, editedBlog);
    result.user = user;
    dispatch({
      type: "ADD_COMMENT",
      data: result,
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "LIKE":
      return [
        ...state.filter((item) => item.id !== action.data.id),
        action.data,
      ];
    case "DELETE":
      return state.filter((item) => item.id !== action.data.id);
    case "ADD":
      return [...state, action.data];
    case "GET_BLOGS":
      return action.data;
    case "ADD_COMMENT":
      return [
        ...state.filter((item) => item.id !== action.data.id),
        action.data,
      ];
    default:
      return state;
  }
};

export default reducer;
