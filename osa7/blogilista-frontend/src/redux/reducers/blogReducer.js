import blogService from "../../services/blogs";

export const like = (blog) => {
  return async (dispatch) => {
    delete blog.user;
    blog.likes = blog.likes + 1;
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
    });
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

const reducer = (state = [], action) => {
  console.log(action);
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
    default:
      return state;
  }
};

export default reducer;
