import { Button } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Post from "./pages/Post";
import WritePost from "./pages/WritePost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/writepost" component={WritePost} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
