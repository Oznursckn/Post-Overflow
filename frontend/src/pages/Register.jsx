import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const history = useHistory();

  async function handleCreateUser(e) {
    e.preventDefault();
    if (password !== password2) {
      alert("Şifreler eşleşmiyor");
      return;
    }

    try {
      await axios.post("/api/users", {
        firstName: name,
        lastName,
        email,
        password,
      });
      history.push("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="register-container">
      <Card className=" register-card shadow">
        <Card.Body>
          <h1 className="text-center mb-3">Aramıza Katılın </h1>
          <Form onSubmit={handleCreateUser}>
            <Form.Group>
              <Form.Label>İsim</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Soyad</Form.Label>
              <Form.Control
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                E-mail adresin bizimle güvende
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Şifreyi Yeniden Gir</Form.Label>
              <Form.Control
                required
                minLength={6}
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="w-100">
              Üye Ol
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
