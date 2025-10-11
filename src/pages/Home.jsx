import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import productos from '../data/Productos';

function Home() {
  return (
    <Container className="my-5">
      {/* Sección principal */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="fw-bold mb-4">Bienvenidos a nuestra tienda</h1>
          <p className="lead">
            Encuentra los mejores productos de belleza, fragancias y más.
          </p>
          <Button variant="primary" size="lg">
            Ver productos
          </Button>
        </Col>

        <Col md={6} className="text-center">
          <div className="bg-secondary p-3 rounded-3 d-inline-block">
            {/* ✅ Imagen desde public */}
            <img
              src="/img/logo.webp"
              alt="Logo"
              className="img-fluid rounded"
              style={{ maxHeight: "200px" }}
            />
          </div>
        </Col>
      </Row>

      {/* Sección de productos destacados */}
      <Row className="gy-4">
        {productos.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} md={4}>
            <Card className="h-100 shadow-sm">
              {/* ✅ Imagen desde public */}
              <Card.Img
                variant="top"
                src={`/img/${producto.imagen}`}
                alt={producto.nombre}
              />
              <Card.Body className="text-center">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="text-muted">{producto.marca}</Card.Text>
                <Card.Text className="fw-bold">${producto.precio}</Card.Text>
                <Button variant="success">Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Footer */}
      <footer className="text-center mt-5 border-top pt-3">
        {/* ✅ Imagen desde public */}
        <img
          src="/img/logo.webp"
          alt="Logo"
          className="img-fluid mb-3"
          style={{ maxHeight: "120px" }}
        />
        <p className="text-muted">© 2025 Nuestra Tienda. Todos los derechos reservados.</p>
      </footer>
    </Container>
  );
}

export default Home;
