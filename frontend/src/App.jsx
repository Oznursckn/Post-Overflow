import { Button } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";

export default function App() {
 
  return (
    <Layout>
      <Home/>
    </Layout>
  );
}
