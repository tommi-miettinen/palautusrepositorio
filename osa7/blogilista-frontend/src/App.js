import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import BlogList from "./components/BlogList/BlogList";
import BlogForm from "./components/BlogForm/BlogForm";
import Blog from "./components/Blog/Blog";
import LoginForm from "./components/LoginForm/LoginForm";
import UserStatus from "./components/UserStatus/UserStatus";
import Users from "./components/Users/Users";
import User from "./components/User/User";
import Navigation from "./components/Navigation/Navigation";
import Notification from "./components/Notification/Notification";
import { setUser } from "./redux/reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.user) {
      dispatch(setUser(JSON.parse(localStorage.user)));
    }
  }, []);

  return (
    <div>
      <Navigation />
      <UserStatus />
      <Notification />
      <Route path="/blogs" exact>
        <BlogForm />
        <BlogList />
      </Route>
      <Route path="/blogs/:id">
        <Blog />
      </Route>
      <Route path="/users" exact>
        <Users />
      </Route>
      <Route path="/users/:id" exact>
        <User />
      </Route>
      <Route path="/" exact>
        <LoginForm />
      </Route>
    </div>
  );
};

export default App;
