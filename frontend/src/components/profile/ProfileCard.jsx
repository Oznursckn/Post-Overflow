import { Card, Button, Modal, Form, InputGroup, Alert } from "react-bootstrap";
import { Gift } from "react-feather";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import authService from "../../services/authService";

export default function ProfileCard() {
  const history = useHistory();
  const [isUpdateProfileShow, setIsUpdateProfileShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState();
  const [authUser, setAuthUser] = useState();
  const [isDeleteAccountShow, setIsDeleteAccountShow] = useState(false);
  const [error, setError] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  useEffect(() => {
    getUser();
    setAuthUser(authService.getAuthenticatedUser());
  }, [id]);

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
        password: newPassword || undefined,
        passwordAgain: newPasswordAgain || undefined,
      });
      getUser();
      setIsUpdateProfileShow(false);
      setError(null);
      setNewPassword("");
      setNewPasswordAgain("");
      setOldPassword("");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  async function handleDeleteUser() {
    await axios.delete(`/api/users/${user.id}`);
    await authService.deleteUser();
    history.push("/");
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
          <p>{user.about ? user.about : "A????klama Bulunmamakta"}</p>
          <div className="d-flex justify-content-center align-items-center text-muted font-smaller">
            <Gift />{" "}
            <span className="ml-2">
              {new Date(user.dateCreated).toLocaleDateString()}
            </span>
          </div>
        </Card.Body>
        {authUser && authUser.id === id ? (
          <Button
            className="position-absolute"
            style={{ right: "10px", top: "10px" }}
            onClick={() => setIsUpdateProfileShow(true)}
          >
            Profili G??ncelle
          </Button>
        ) : null}
      </Card>

      <Modal
        show={isUpdateProfileShow}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Profili G??ncelle</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateUser}>
          <Modal.Body>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  placeholder="??sim"
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
                E-mailinizi kimse ile payla??m??yoruz.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Hakk??mda"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Eski ??ifreniz"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Yeni ??ifreniz"
                value={newPassword}
                minLength={6}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Yeni ??ifreniz Yeniden"
                value={newPasswordAgain}
                minLength={6}
                onChange={(e) => setNewPasswordAgain(e.target.value)}
              />
            </Form.Group>

            {error ? <Alert variant="danger">{error}</Alert> : null}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              className="mr-auto"
              onClick={() => setIsDeleteAccountShow(true)}
            >
              Hesab??m?? Sil
            </Button>
            <Button
              variant="danger"
              onClick={() => setIsUpdateProfileShow(false)}
            >
              ??ptal
            </Button>
            <Button variant="primary" type="submit">
              G??ncelle
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={isDeleteAccountShow}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <h3>Hesab??n?? silmek istedi??ine emin misin?</h3>
        </Modal.Header>
        <Modal.Body>
          <p>Bu i??lem geri al??namaz ve hesab??n??z sonsuza kadar silinir.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setIsDeleteAccountShow(false)}
          >
            ??ptal
          </Button>
          <Button variant="danger" type="submit" onClick={handleDeleteUser}>
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
