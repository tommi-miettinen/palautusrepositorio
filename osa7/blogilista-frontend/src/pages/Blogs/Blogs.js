import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../../redux/reducers/blogReducer";
import BlogForm from "../../components/BlogForm/BlogForm";
import BlogList from "../../components/BlogList/BlogList";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return (
    <div>
      <BlogForm />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blogs;
