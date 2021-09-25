import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUsers } from "../../redux/reducers/userReducer";
import BlogList from "../../components/BlogList/BlogList";

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
      <BlogList blogs={user.blogs} />
    </div>
  );
};

export default User;
