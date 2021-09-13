import { useState } from "react";

const BlogForm = ({ handlePost, setFormVisible }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "10%",
        border: "1px solid black",
        padding: 20,
        margin: "20px 0px",
      }}
    >
      <label>title</label>
      <input
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
      ></input>
      <label>author</label>
      <input
        id="author"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        type="text"
      ></input>
      <label>url</label>
      <input
        id="url"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        type="text"
      ></input>
      <button onClick={() => handlePost({ title, author, url })}>create</button>
      <button onClick={() => setFormVisible(false)}>cancel</button>
    </div>
  );
};

export default BlogForm;
