import { Card, Button, Modal, Form } from "react-bootstrap";
import { Gift } from "react-feather";
import { useState } from "react";

export default function ProfileCard() {
  const [isUpdateProfileShow, setIsUpdateProfileShow] = useState(false);

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&size=150&rounded=true"
            alt="John Doe"
          />
          <h2 className="font-weight-bolder my-3">John Doe</h2>
          <p>Açıklama Yok</p>
          <div className="d-flex justify-content-center align-items-center text-muted font-smaller">
            <Gift /> <span className="ml-2">12/12/2020</span>
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
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Kullanıcı Adı" />
            </Form.Group>

            <Form.Group>
              <Form.Control type="email" placeholder="E-mail gir" />
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
              />
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" placeholder="Eski Şifreniz" />
            </Form.Group>

            <Form.Group>
              <Form.Control type="password" placeholder="Yeni Şifreniz" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setIsUpdateProfileShow(false)}
          >
            İptal
          </Button>
          <Button variant="primary">Güncelle</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
