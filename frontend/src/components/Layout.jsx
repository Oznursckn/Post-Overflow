import {
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar bg="light" expand="lg" className="shadow">
        <Link to="/">
          <Navbar.Brand className="navbar-logo">
            Post Overflow
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="search-input">
            <InputGroup>
              <FormControl placeholder="Ara" />
              <InputGroup.Append>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <div className="ml-auto">
            <Link to="/login">
              <Button variant="light" className="mr-3">
                Giriş Yap
              </Button>
            </Link>
            <Link to="/register">
              <Button>Üye Ol</Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Container className="content my-5">{children}</Container>
      <footer className="footer d-flex flex-column justify-content-center align-items-center bg-light">
        Öznur Suçeken & Merve Sezer & Artun Çolak
      </footer>
    </div>
  );
}
