import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ border: "1px solid black", padding: 10, margin: 0 }}>
      <ul style={{ listStyle: "none", display: "flex" }}>
        <Link style={navItemStyle} to="/blogs">
          blogs
        </Link>
        <Link style={navItemStyle} to="/users">
          users
        </Link>
      </ul>
    </nav>
  );
};

const navItemStyle = {
  margin: 10,
  width: 70,
  textAlign: "center",
  padding: 10,
  border: "1px solid black",
  color: "white",
  backgroundColor: "#842B45",
  textDecoration: "none",
};

export default Navigation;
