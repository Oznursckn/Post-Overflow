import React from "react";
import Comments from "../components/post/Comments";
import { Row, Col, Card } from "react-bootstrap";
import { Archive, Heart } from "react-feather";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Post() {
  const [postDetail, setPostDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPost() {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      setPostDetail(response.data);
      setLoading(false);
    }
    getPost();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <div>
      <Row>
        <Col className="postpage-left" md={1}>
          <Row>
            <Heart></Heart>
          </Row>
          <br />
          <Row>
            <Archive></Archive>
          </Row>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{postDetail.title}</Card.Title>
              <Card.Text>{postDetail.body}</Card.Text>
              <hr/>
              <h4 className="font-font-weight-bolder">Comments</h4>
             <Comments/>
            </Card.Body>
            
          </Card>
        </Col>
        <Col md={3} className="postpage-right">
          <div class="card">
            <div class="card-header text-center">Featured</div>
            <div class="card-body">
              <h5 class="card-title">About</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <h5>Joined</h5>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
