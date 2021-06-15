import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import WritePost from "./pages/WritePost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import Search from "./pages/Search";
import PostsByTag from "./pages/PostsByTag";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tag/:id" component={PostsByTag} />
        <Route exact path="/search/:search" component={Search} />
        <Route exact path="/post/:slug/:id" component={Post} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/writepost" component={WritePost} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}
