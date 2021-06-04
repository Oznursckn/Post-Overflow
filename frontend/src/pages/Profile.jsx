import { Card, Col, Row } from "react-bootstrap";
import { BookOpen, Heart, Save } from "react-feather";
import Layout from "../components/Layout";
import ProfileCard from "../components/profile/ProfileCard";
import UserPosts from "../components/profile/UserPosts";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LikedPosts from "../components/profile/LikedPosts";
import SavedPosts from "../components/profile/SavedPosts";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("user-posts");
  const { id } = useParams();

  return (
    <Layout>
      <ProfileCard />
      <Row className="mt-3">
        <Col className="mb-3" sm>
          <Card>
            <Card.Body className="d-flex flex-column" style={{ gap: 20 }}>
              <button
                className={`like-button d-flex ${
                  selectedTab === "user-posts" ? "selected-tab" : ""
                }`}
                onClick={() => setSelectedTab("user-posts")}
              >
                <BookOpen />
                <span className="ml-2">Paylaşımlar</span>
              </button>
              <button
                className={`like-button d-flex ${
                  selectedTab === "liked-posts" ? "selected-tab" : ""
                }`}
                onClick={() => setSelectedTab("liked-posts")}
              >
                <Heart />
                <span className="ml-2">Beğenilenler</span>
              </button>
              <button
                className={`like-button d-flex ${
                  selectedTab === "saved-posts" ? "selected-tab" : ""
                }`}
                onClick={() => setSelectedTab("saved-posts")}
              >
                <Save />
                <span className="ml-2">Kaydedilenler</span>
              </button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm>
          {selectedTab === "user-posts" ? <UserPosts id={id} /> : null}
          {selectedTab === "liked-posts" ? <LikedPosts id={id} /> : null}
          {selectedTab === "saved-posts" ? <SavedPosts id={id} /> : null}
        </Col>
      </Row>
    </Layout>
  );
}
