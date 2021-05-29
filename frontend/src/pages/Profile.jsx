import { Card, Col, Row } from "react-bootstrap";
import { BookOpen, Heart, Save } from "react-feather";
import Layout from "../components/Layout";
import Post from "../components/Post";
import ProfileCard from "../components/profile/ProfileCard";

export default function Profile() {
  return (
    <Layout>
      <ProfileCard />
      <Row className="mt-3">
        <Col className="mb-3" sm>
          <Card>
            <Card.Body className="d-flex flex-column" style={{ gap: 20 }}>
              {/* TODO: Link olarak değiştirilecek */}
              <div>
                <BookOpen /> Paylaşımlar
              </div>
              <div>
                <Heart /> Beğenilenler
              </div>
              <div>
                <Save /> Kaydedilenler
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm>
          <Post data={{ title: "Başlık", body: "Deneme" }} />
          <Post data={{ title: "Başlık", body: "Deneme" }} />
          <Post data={{ title: "Başlık", body: "Deneme" }} />
        </Col>
      </Row>
    </Layout>
  );
}
