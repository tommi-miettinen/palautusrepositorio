import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUsers } from "../../redux/reducers/userReducer";
import { Link } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  //prettier-ignore
  const user = useSelector(({ userState: { users } }) => users.find((user) => user.id === id));

  useEffect(() => {
    if (!user) dispatch(getUsers());
  }, []);

  if (!user) return null;

  return (
    <div>
      {user.username} added blogs
      <div>
        {user.blogs.map((blog) => (
          <div>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
