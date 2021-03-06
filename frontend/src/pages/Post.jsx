import React from "react";
import Comments from "../components/post/Comments";
import { Row, Col, Card, Badge, Button, Form } from "react-bootstrap";
import { Bookmark, Calendar, Heart } from "react-feather";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import authService from "../services/authService";
import { useHistory } from "react-router";

export default function Post() {
  const [postDetail, setPostDetail] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [authUser, setAuthUser] = useState();
  const [commentBody, setCommentBody] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  async function getPost() {
    let response = await axios.get(`/api/posts/${id}`);
    setPostDetail(response.data);
    setLoading(false);
  }
  async function getComments() {
    let response = await axios.get(`/api/posts/${id}/comments`);
    setComments(response.data);
    setCommentsLoading(false);
  }

  useEffect(() => {
    getPost();
    getComments();
    setAuthUser(authService.getAuthenticatedUser());
  }, []);

  useEffect(() => {
    if (authUser) {
      getIsLiked();
      getIsSaved();
    }
  }, [authUser]);

  async function getIsSaved() {
    setIsSaved(
      (
        await axios.post(`/api/posts/${id}/is-saved`, {
          userId: authUser.id,
        })
      ).data
    );
  }

  async function getIsLiked() {
    setIsLiked(
      (
        await axios.post(`/api/posts/${id}/is-liked`, {
          userId: authUser.id,
        })
      ).data
    );
  }

  async function savePost() {
    await axios.post(`/api/posts/${id}/${isSaved ? "unsave" : "save"}`, {
      userId: authUser.id,
    });
    getIsSaved();
  }

  async function likePost() {
    if (authUser) {
      await axios.post(`/api/posts/${id}/${isLiked ? "unlike" : "like"}`, {
        userId: authUser.id,
      });
      await getIsLiked();
      isLiked ? postDetail.likes-- : postDetail.likes++;
      setPostDetail({ ...postDetail });
    } else {
      history.push("/login");
    }
  }

  async function handleSaveComment(e) {
    e.preventDefault();

    await axios.post("/api/comments", {
      body: commentBody,
      postId: id,
      userId: authUser.id,
    });

    setCommentBody("");

    getComments();
  }

  if (loading) {
    return null;
  }
  return (
    <Layout>
      <Row>
        <Col className="postpage-left" md={1}>
          <Row>
            <button className="like-button d-flex" onClick={likePost}>
              <Heart className={`${isLiked ? "text-danger" : ""}`} />
              <span className="ml-2">{postDetail.likes}</span>
            </button>
          </Row>
          <br />
          <Row>
            {authUser ? (
              <button
                className={`like-button ${isSaved ? "text-info" : ""}`}
                onClick={savePost}
              >
                <Bookmark />
              </button>
            ) : null}
          </Row>
        </Col>
        <Col md={8}>
          <Card className="mb-3 post-detail">
            <Card.Body>
              <Card.Title className="font-weight-bold">
                {postDetail.title}
              </Card.Title>
              <div className="d-flex" style={{ gap: 5 }}>
                {postDetail.tags.map((tag) => (
                  <Link key={tag.id} to={`/tag/${tag.id}`}>
                    <Badge variant="primary">{tag.name}</Badge>
                  </Link>
                ))}
              </div>
              <div className="text-muted my-3 d-flex align-items-center">
                <Calendar />
                <span className="ml-2">
                  {new Date(postDetail.dateCreated).toLocaleDateString()}
                </span>
              </div>
              <Card.Text>{postDetail.body}</Card.Text>
              <hr />
              {authUser ? (
                <Form className="mb-3" onSubmit={handleSaveComment}>
                  <Form.Group>
                    <Form.Label>Yorum Yap</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={commentBody}
                      onChange={(e) => setCommentBody(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    G??nder
                  </Button>
                </Form>
              ) : null}
              <h4 className="font-font-weight-bolder">Yorumlar</h4>
              {commentsLoading ? (
                <p className="text-muted text-center">Y??kleniyor</p>
              ) : comments.length > 0 ? (
                <Comments data={comments} getComments={getComments} />
              ) : (
                <p className="text-muted text-center">Yorum Yok</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        {postDetail.user ? (
          <Col md={3} className="postpage-right">
            <div class="card">
              <div class="card-header text-center">Yazar</div>
              <div class="card-body">
                <h5 class="card-title">
                  {postDetail.user.firstName} {postDetail.user.lastName}
                </h5>
                <p class="card-text">
                  {postDetail.user.about || "Hakk??nda Bulunmamaktad??r"}
                </p>
                <Link to={`/profile/${postDetail.user.id}`}>
                  <Button className="w-100">Profile Git</Button>
                </Link>
              </div>
            </div>
          </Col>
        ) : null}
      </Row>
    </Layout>
  );
}
