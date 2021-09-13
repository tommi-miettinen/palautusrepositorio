import { useState } from "react";

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ border: "1px solid black", minHeight: 40, padding: 20 }}>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      <div>Title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      {showDetails && (
        <div>
          <div>Url:{blog.url} </div>
          <div>
            Likes: {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          {blog.user.username === user.username && (
            <button onClick={() => handleDelete(blog.id)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
