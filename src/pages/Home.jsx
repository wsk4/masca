import React from "react";
import { Container, Row, Col, Button as BsButton } from "react-bootstrap";
import products from "../data/Productos";
import ProductCard from "../components/ProductHomeCard";

function Home() {
  return (
    <Container className="my-5">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="fw-bold mb-3">Mascapitos Store</h1>
          <p className="lead">
            Nuestra tienda online ofrece productos seleccionados de todas las regiones. 
            Encuentra lo que necesitas al mejor precio.
          </p>
          <BsButton variant="dark" size="lg">
            Ver más
          </BsButton>
        </Col>

        <Col md={6} className="text-center">
          <img
            src="/img/logo.webp"
            alt="Logo Mascapitos"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "200px" }}
          />
        </Col>
      </Row>

      {/* Sección de productos */}
      <Row className="gy-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>

      {/* Footer */}
      <footer className="text-center mt-5 border-top pt-3">
        <img
          src="/img/logo.webp"
          alt="Logo footer"
          className="img-fluid mb-3"
          style={{ maxHeight: "120px" }}
        />
        <p className="text-muted">
          © {new Date().getFullYear()} Mascapitos Store — Todos los derechos reservados.
        </p>
      </footer>
    </Container>
  );
}

export default Home;
