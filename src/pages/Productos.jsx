import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from "../components/organisms/ProductCard";
import productos from '../data/Productos';


function Productos() {
    return (
        <Container className="my-5">
        <h1>Productos</h1>
        <Row>
            {productos.map((productos) => (
            <ProductCard key={productos.id} product={productos} />
            ))}
        </Row>
        </Container>
    );
}

export default Productos;
