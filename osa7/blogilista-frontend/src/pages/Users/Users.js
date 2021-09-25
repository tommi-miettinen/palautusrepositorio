import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/reducers/userReducer";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userState.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "center" }}>User</th>
            <th style={{ textAlign: "center" }}>created blogs</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td style={{ textAlign: "center" }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
