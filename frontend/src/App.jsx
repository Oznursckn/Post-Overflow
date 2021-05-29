import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import WritePost from "./pages/WritePost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";

export default function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/:id" component={Post} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/writepost" component={WritePost} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Switch>
    </BrowserRouter>
  );
}
