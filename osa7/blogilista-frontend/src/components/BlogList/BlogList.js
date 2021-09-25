import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const sortByLikes = (arr) => [...arr].sort((a, b) => b.likes - a.likes);
  const sortedBlogs = sortByLikes(blogs);

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <div
          key={blog.id}
          style={{ border: "1px solid black", padding: 20, margin: 1 }}
        >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
