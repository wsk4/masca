import React from "react";
import {Container,Row,Col,Card,Button,Form} from "react-bootstrap";
import logo from "../img/logo.webp";
import productos from "../data/Productos";

function Home() {
  return (
    <>
      {/* Sección principal */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="fw-bold">Mascapitos Store</h2>
              <p className="text-muted">
                Nuestra tienda online ofrece productos seleccionados de todas las
                regiones. Encuentra lo que necesitas al mejor precio.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <div className="bg-secondary p-3 rounded-3 d-inline-block">
                <img
                  src={logo}
                  alt="Logo"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Productos */}
      <Container className="py-5">
        <Row className="g-4">
          {productos.map((p) => (
            <Col key={p.id} xs={12} md={6} lg={3}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={p.img}
                  alt={p.nombre}
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    <a
                      href={p.link}
                      className="text-decoration-none text-dark"
                    >
                      {p.nombre}
                    </a>
                  </Card.Title>
                  <Card.Text className="text-muted">{p.descripcion}</Card.Text>
                  <Card.Text className="fw-bold">
                    ${p.precio.toLocaleString()}
                  </Card.Text>
                  <Button variant="dark" href={p.link}>
                    Ver más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light pt-5">
        <Container>
          <Row className="align-items-center text-center text-md-start">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src={logo}
                alt="Logo"
                className="img-fluid mb-3"
                style={{ maxHeight: "120px" }}
              />
              <h5 className="fw-bold">Mascapitos Store</h5>
              <p className="text-secondary mb-0">
                Perfumes exclusivos y de alta calidad.
              </p>
            </Col>

            <Col md={3} className="mb-4 mb-md-0">
              <h5 className="fw-bold">Categorías</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!" className="text-secondary text-decoration-none">
                    Perfume
                  </a>
                </li>
              </ul>
            </Col>

            <Col md={3}>
              <h5 className="fw-bold">Suscríbete</h5>
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu mail"
                    className="bg-transparent text-light border-light"
                  />
                </Form.Group>
                <Button variant="light" type="submit" className="w-100">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>

          <div className="border-top border-secondary mt-4 pt-3 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Mi Tienda Online
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Home;
