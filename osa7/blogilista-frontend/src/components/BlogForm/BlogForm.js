import { useState } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { addBlog } from "../../redux/reducers/blogReducer";
import { setNotification } from "../../redux/reducers/notificationReducer";

const BlogForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();

  const handlePost = async (blog) => {
    try {
      dispatch(addBlog(blog));
      dispatch(setNotification(`${blog.title} added`, false, 5));
      setFormVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  return formVisible ? (
    <div style={containerStyle}>
      <label>title</label>
      <input id="title" {...title} reset=""></input>
      <label>author</label>
      <input id="author" {...author} reset=""></input>
      <label>url</label>
      <input id="url" {...url} reset=""></input>
      {/*prettier-ignore*/}
      <button onClick={() => handlePost({ title: title.value, author:author.value, url: url.value})}>create</button>
      <button onClick={() => setFormVisible(false)}>cancel</button>
    </div>
  ) : (
    <button style={buttonStyle} onClick={() => setFormVisible(true)}>
      create new blog
    </button>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  width: "10%",
  border: "1px solid black",
  padding: 20,
  margin: "20px 0px",
};

const buttonStyle = {
  textAlign: "center",
  padding: 10,
  marginTop: 30,
  marginBottom: 10,
  border: "1px solid black",
  color: "white",
  backgroundColor: "#842B45",
  textDecoration: "none",
};

export default BlogForm;
