import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import "../../styles/blogs.css"; 

function BlogCard({ blog }) {
  const navigate = useNavigate();

  return (
    <Col md={6} sm={12} className="mb-4">
      <Card className="blog-card text-center text-light">
        <Card.Body>
          <Card.Title className="blog-title">{blog.title}</Card.Title>
          <Card.Text className="blog-summary">{blog.summary}</Card.Text>
          <Button
            variant="primary"
            className="blog-button"
            onClick={() => navigate(`/blogs/${blog.id}`)}
          >
            Ver caso
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BlogCard;
