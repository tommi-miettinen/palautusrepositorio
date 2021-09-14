import React, { useState, useEffect } from "react";
import Blog from "./components/Blog/Blog";
import LoginForm from "./components/LoginForm/LoginForm";
import Notification from "./components/Notification/Notification";
import BlogForm from "./components/BlogForm/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLogin = async (userInfo) => {
    try {
      const result = await loginService.login(userInfo);
      localStorage.user = JSON.stringify(result);
      blogService.setToken(result.token);
      setUser(result);
    } catch (err) {
      setError(true);
      setNotification("Invalid username or password");
      setTimeout(() => {
        setError(false);
        setNotification("");
      }, 5000);
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      updatedBlog.user = updatedBlog.user.id;
      await blogService.update(blog.id, updatedBlog);
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Delete blog?");
      if (confirmed) {
        await blogService.remove(id);
        fetchBlogs();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePost = async (blog) => {
    try {
      await blogService.create(blog);
      setError(false);
      setFormVisible(false);
      setNotification("Blog added");
      fetchBlogs();
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (err) {
      setError(true);
      setNotification("Something went wrong");
      setTimeout(() => {
        setNotification("");
        setError(false);
      }, 5000);
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return user ? (
    <div>
      <h2>blogs</h2>
      <Notification isError={error} notification={notification} />
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {formVisible ? (
        <BlogForm handlePost={handlePost} setFormVisible={setFormVisible} />
      ) : (
        <button onClick={() => setFormVisible(true)}>create new blog</button>
      )}
      {sortedBlogs.map((blog) => (
        <Blog
          user={user}
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  ) : (
    <div>
      <Notification isError={error} notification={notification} />
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default App;
