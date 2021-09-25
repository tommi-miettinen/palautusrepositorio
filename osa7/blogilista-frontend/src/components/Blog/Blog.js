import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { like, deleteBlog, getBlogs } from "../../redux/reducers/blogReducer";
import { setNotification } from "../../redux/reducers/notificationReducer";

const Blog = () => {
  const id = useParams().id;
  const history = useHistory();
  const user = useSelector((state) => state.userState.user);
  //prettier-ignore
  const blog = useSelector((state) => state.blogs.find((blog) => blog.id === id));
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
        dispatch(setNotification(`${blog.title} deleted`, false, 5));
        history.push("/blogs");
      }
    } catch (err) {
      dispatch(setNotification("Something went wrong", true, 5));
    }
  };

  if (!blog) return null;

  //prettier-ignore
  const isOwner = blog ? blog.user.id === user.id || blog.user === user.id : false;

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          minHeight: 40,
          padding: 20,
          margin: 1,
        }}
      >
        <h1>
          {blog.title} {blog.author}
        </h1>
        <div>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
          <div>
            Likes: {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>added by {blog.user.username}</div>
          {isOwner && (
            <button onClick={() => handleDelete(blog)}>delete</button>
          )}
        </div>
      </div>
      <h3>comments</h3>
      {blog.comments.map((comment, index) => (
        <div style={{ margin: 10 }} key={index + comment}>
          {comment}
        </div>
      ))}
    </div>
  );
};

export default Blog;
