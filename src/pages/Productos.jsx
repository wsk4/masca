import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductHomeCard from "../components/organisms/productHomeCard";
import productos from '../data/Productos';


function Productos() {
    return (
        <Container className="my-5">
        <h1>Productos</h1>
        <Row>
            {productos.map((productos) => (
            <ProductHomeCard key={productos.id} producto={productos} />
            ))}
        </Row>
        </Container>
    );
}

export default Productos;
