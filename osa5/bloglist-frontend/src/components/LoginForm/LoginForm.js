import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
      ></input>
      <label>Salasana</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
      ></input>
      <button onClick={() => handleLogin({ username, password })}>login</button>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
