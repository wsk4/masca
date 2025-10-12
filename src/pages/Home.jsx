import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import productos from "../data/Productos";
import ProductHomeCard from "../components/organisms/productHomeCard"; 
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

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
          <Button variant="primary" onClick={() => navigate(`/products`)}>
            Ver más
          </Button>
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
      <Row>
        <Col className="text-center">
          <h2 className="fw-bold mb-4">Productos Destacados</h2>
        </Col>
      </Row>

      {/* Sección de productos */}
      <Row className="gy-4">
        {productos.map((producto) => (
          <ProductHomeCard key={producto.id} producto={producto} />
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
