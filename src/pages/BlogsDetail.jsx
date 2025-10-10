import React from "react";
import { Container, Row } from "react-bootstrap";
import BlogCard from "../components/organisms/BlogsCard";
import blogs from "../data/Blogs";

function Blogs() {
  return (
    <Container className="my-5">
      <h1 className="text-dark fw-bold text-center">Casos curiosos</h1>
      <p className="text-center mb-4 text-dark">
        En esta sección encontrarás algunas experiencias divertidas y reales de
        nuestros clientes. ¡Porque en Mascapitos Store cada aroma tiene una
        historia!
      </p>
      <Row>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Row>
    </Container>
  );
}

export default Blogs;
