import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { like, deleteBlog, getBlogs } from "../../redux/reducers/blogReducer";

const Blog = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.userState.user);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!blog) dispatch(getBlogs());
  });

  const handleLike = async (blog) => {
    try {
      dispatch(like(blog));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (blog) => {
    try {
      const confirmed = window.confirm("Delete blog?");
      if (confirmed) {
        dispatch(deleteBlog(blog));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isOwner = blog
    ? blog.user.id === user.id || blog.user === user.id
    : false;

  return blog ? (
    <div
      style={{
        border: "1px solid black",
        minHeight: 40,
        padding: 20,
        margin: 1,
      }}
    >
      <div>Title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      <div>
        <div>Url:{blog.url} </div>
        <div>
          Likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        {isOwner && <button onClick={() => handleDelete(blog)}>delete</button>}
      </div>
    </div>
  ) : null;
};

export default Blog;
