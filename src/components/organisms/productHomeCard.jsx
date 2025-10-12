import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";




function ProductHomeCard({ producto }) {
    const navigate = useNavigate();

    return (
        <Col md={3} sm={6} xs={12} className="mb-4">
        <Card
            className="text-center text-light"
            style={{
            background: "linear-gradient(to bottom, #212529, #343a40)",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
        >
            {/* Imagen del producto desde /public/img */}
            <Card.Img
            variant="top"
            src={`/img/${producto.image}`}
            alt={producto.nombre}
            style={{
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                height: "260px",
                objectFit: "cover",
            }}
            />

            <Card.Body>
            <Card.Title className="fw-bold">{producto.nombre}</Card.Title>
            <Card.Text className="text-muted">{producto.marca}</Card.Text>
            <Card.Text className="fw-bold text-light">
                ${producto.precio.toLocaleString("es-CL")}
            </Card.Text>

            <Button
                variant="primary"
                onClick={() => navigate(`/productos/${producto.id}`)}
                style={{
                background: "linear-gradient(gray, black)",
                border: "2px solid black",
                }}
            >
                Ver producto
            </Button>
            </Card.Body>
        </Card>
        </Col>
    );
}

export default ProductHomeCard;
