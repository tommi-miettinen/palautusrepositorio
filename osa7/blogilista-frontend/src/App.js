import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import LoginForm from "./components/LoginForm/LoginForm";
import Users from "./pages/Users/Users";
import User from "./pages/User/User";
import Navigation from "./components/Navigation/Navigation";
import Notification from "./components/Notification/Notification";
import { setUser } from "./redux/reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  useEffect(() => {
    if (localStorage.user) {
      dispatch(setUser(JSON.parse(localStorage.user)));
    }
  }, []);

  if (!user)
    return (
      <Switch>
        <Route path="/" exact>
          <Notification />
          <LoginForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    );

  return (
    <div>
      <Navigation />
      <Notification />
      <Switch>
        <Route path="/blogs/:id" exact>
          <BlogDetails />
        </Route>
        <Route path="/blogs" exact>
          <Blogs />
        </Route>
        <Route path="/users/:id" exact>
          <User />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Redirect to="/blogs" />
      </Switch>
    </div>
  );
};

export default App;
