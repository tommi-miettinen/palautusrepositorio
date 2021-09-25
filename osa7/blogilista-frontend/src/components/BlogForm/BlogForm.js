import { useState } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { addBlog } from "../../redux/reducers/blogReducer";

const BlogForm = () => {
  const [formVisible, setFormVisible] = useState(false);
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();

  const handlePost = async (blog) => {
    try {
      dispatch(addBlog(blog));
      setFormVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={containerStyle}>
      {formVisible ? (
        <>
          <label>title</label>
          <input id="title" {...title}></input>
          <label>author</label>
          <input id="author" {...author}></input>
          <label>url</label>
          <input id="url" {...url}></input>
          {/*prettier-ignore*/}
          <button onClick={() => handlePost({ title: title.value, author:author.value, url: url.value})}>create</button>
          <button onClick={() => setFormVisible(false)}>cancel</button>
        </>
      ) : (
        <button onClick={() => setFormVisible(true)}>create new blog</button>
      )}
    </div>
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

export default BlogForm;
