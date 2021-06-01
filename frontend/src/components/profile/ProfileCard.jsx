import { Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { Gift, Zap } from "react-feather";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileCard() {
  const [isUpdateProfileShow, setIsUpdateProfileShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await axios.get(`/api/users/${id}`);
    setUser(response.data);
    setIsLoading(false);
    const { firstName, lastName, email, about } = response.data;
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setAbout(about);
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user.id}`, {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email: email || undefined,
        about,
        oldPassword: oldPassword || undefined,
        newPassword: newPassword || undefined,
        newPasswordAgain: newPasswordAgain || undefined,
      });
      getUser();
      setIsUpdateProfileShow(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  if (isLoading) return null;

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <img
            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=150&rounded=true`}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <h2 className="font-weight-bolder my-3">{`${user.firstName} ${user.lastName}`}</h2>
          <p>{user.about ? user.about : "Açıklama Bulunmamakta"}</p>
          <div className="d-flex justify-content-center align-items-center text-muted font-smaller">
            <Gift />{" "}
            <span className="ml-2">
              {new Date(user.dateCreated).toLocaleDateString()}
            </span>
          </div>
        </Card.Body>
        <Button
          className="position-absolute"
          style={{ right: "10px", top: "10px" }}
          onClick={() => setIsUpdateProfileShow(true)}
        >
          Profili Güncelle
        </Button>
      </Card>

      <Modal show={isUpdateProfileShow} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Profili Güncelle</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateUser}>
          <Modal.Body>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  placeholder="İsim"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control
                  placeholder="Soyisim"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="email"
                placeholder="E-mail gir"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                E-mailinizi kimse ile paylaşmıyoruz.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Hakkımda"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Eski Şifreniz"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Yeni Şifreniz"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Yeni Şifreniz Yeniden"
                value={newPasswordAgain}
                onChange={(e) => setNewPasswordAgain(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => setIsUpdateProfileShow(false)}
            >
              İptal
            </Button>
            <Button variant="primary" type="submit">
              Güncelle
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
