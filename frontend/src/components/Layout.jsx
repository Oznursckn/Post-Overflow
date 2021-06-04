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
import authService from "../services/authService";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setAuthenticatedUser(authService.getAuthenticatedUser());
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    window.location.href = `/search/${search}`;
  }

  async function handleLogout() {
    await authService.logout();
    window.location.href = "/";
  }

  return (
    <div className="layout">
      <Navbar bg="light" expand="lg" className="shadow">
        <Link to="/">
          <Navbar.Brand className="navbar-logo">Post Overflow</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="search-input" onSubmit={handleSearch}>
            <InputGroup>
              <FormControl
                placeholder="Ara"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          {authenticatedUser ? (
            <div className="ml-auto">
              <Link to={`/profile/${authenticatedUser.id}`}>
                <Button variant="light" className="mr-3">
                  Profil
                </Button>
              </Link>
              <Link to="/writepost">
                <Button>Paylaşım Yap</Button>
              </Link>
              <Button variant="danger" className="ml-3" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            </div>
          ) : (
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
          )}
        </Navbar.Collapse>
      </Navbar>
      <Container className="content my-5">{children}</Container>
      <footer className="footer d-flex flex-column justify-content-center align-items-center bg-light">
        Öznur Suçeken & Merve Sezer & Artun Çolak
      </footer>
    </div>
  );
}
