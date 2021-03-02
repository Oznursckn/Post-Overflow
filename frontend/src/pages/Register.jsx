import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  function controlPassword() {
    if (password1 == password2) {
      alert("şifreler eşleşiyor");
    } else {
      alert("şifreler eşleşmiyor");
    }
  }

  return (
    <div className="register-container">
      <Card className=" register-card shadow">
        <Card.Body>
          <h1 className="text-center mb-3">Aramıza Katılın </h1>
          <Form>
            <Form.Group>
              <Form.Label>İsim</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Soyad</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Şifreyi Yeniden Gir</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="w-100">Üye Ol</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
