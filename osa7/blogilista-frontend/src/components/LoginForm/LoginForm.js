import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useField } from "../../hooks";
import { setUser } from "../../redux/reducers/userReducer";
import { setNotification } from "../../redux/reducers/notificationReducer";
import blogService from "../../services/blogs";
import loginService from "../../services/login";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = async (userInfo) => {
    try {
      const result = await loginService.login(userInfo);
      localStorage.user = JSON.stringify(result);
      blogService.setToken(result.token);
      dispatch(setUser(result));
      history.push("/blogs");
    } catch (err) {
      dispatch(setNotification("Invalid credentials", true, 5));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "10%",
        border: "1px solid black",
        padding: 20,
      }}
    >
      <label>Käyttäjä</label>
      <input {...username} reset=""></input>
      <label>Salasana</label>
      <input {...password} reset=""></input>
      {/*prettier-ignore*/}
      <button onClick={() => handleLogin({ username: username.value, password: password.value })}>login</button>
    </div>
  );
};

export default LoginForm;
