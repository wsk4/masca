import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";


function BlogCard({ blog }) {
  const navigate = useNavigate();

  return (
    <Col md={6} className="mb-4">
      <Card
        className="text-light"
        style={{
          background: "linear-gradient(Black)",
          border: "none",
          borderRadius: "10px",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center">{blog.title}</Card.Title>
          <Card.Text>{blog.summary}</Card.Text>
          <div className="text-center">
            <Button
              variant="primary"
              onClick={() => navigate(`/blogs/${blog.id}`)}
              style={{
                background: "linear-gradient(gray, black)",
                border: "2px solid black",
              }}
            >
              Ver caso
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BlogCard;
