import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Image from '../atoms/Image';
import CardBody from '../molecules/CardBody';




function ProductHomeCard({ productos }) {
    const navigate = useNavigate();

    return (
        <Col md={3} sm={6} xs={12} className="mb-4">
        <Card
            className="text-center text-light"
            style={{
            background: "linear-gradient(to bottom, #212529, #343a40)",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 1)",
            }}
        >
            <Image src={productos.imagen} alt={productos.nombre} className="card-img-top" />
            <Card.Body>
            <CardBody
                title={productos.nombre}
                description={productos.marca}
                price={productos.precio}
        />
        <Button variant="primary" onClick={() => navigate(`/productos/${productos.id}`)}>
            Ver detalles
        </Button>
            </Card.Body>
        </Card>
        </Col>
    );
}

export default ProductHomeCard;
