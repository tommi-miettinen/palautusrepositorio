import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";

const UserStatus = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));
  };

  if (!user) return null;

  return (
    <div style={{ border: "1px solid black", padding: 20, margin: "10px 0px" }}>
      {user.username} logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default UserStatus;
