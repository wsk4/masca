import React from "react";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Image from "../components/atoms/Image";
import Text from "../components/atoms/Text";
import blogs from "../data/Blogs";
import  "../styles/Blogs.css";


function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <Container className="my-5 text-center">
        <h1>Caso no encontrado</h1>
        <Button variant="primary" onClick={() => navigate("/blogs")}>
          Volver
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="primary" onClick={() => navigate("/blogs")}>
        Volver
      </Button>
      <Card
        className="text-light mt-3"
        style={{
          background: "linear-gradient(Black)",
          border: "none",
          borderRadius: "10px",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <Card.Body>
          <Text variant="h2" className="text-center mb-4">
            {blog.tittle}
          </Text>
          <Text variant="p">{blog.content}</Text>
          <div className="text-center mt-4">
            <Image
              src={blog.image}
              alt={blog.tittle}
              className="blog-detail-image"
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BlogDetail;