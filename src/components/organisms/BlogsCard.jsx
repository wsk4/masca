import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import CardBody from '../molecules/CardBody';


function BlogCard({ blog }) {
  const navigate = useNavigate();

  return (
    <Col md={6} className="mb-4">
      <Card
        className="text-light"
        style={{
          background: "linear-gradient(135deg, #a200ff, #0072ff)",
          border: "none",
          borderRadius: "10px",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <CardBody.Body>
          <CardBody.Title className="text-center">{blog.title}</CardBody.Title>
          <CardBody.Text>{blog.summary}</CardBody.Text>
          <div className="text-center">
            <Button variant="primary" onClick={() => navigate(`/blogs/${blog.id}`)} style={{ background: "linear-gradient(135deg, #a200ff, #0072ff)", border: "2px solid black",}}>
              Ver caso
            </Button>
          </div>
        </CardBody.Body>
      </Card>
    </Col>
  );
}

export default BlogCard;
