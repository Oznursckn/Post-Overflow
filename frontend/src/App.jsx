import { Button } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";
import WritePost from "./pages/WritePost";

export default function App() {
 
  return (
    <Layout>
      {/* <Home/> */}
      {/* <PostPage/> */}
      <WritePost/>

    </Layout>
  );
}
