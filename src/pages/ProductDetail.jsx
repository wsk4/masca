// RUTA: src/pages/ProductDetail.jsx

import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/Products.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';

// LA LÍNEA MÁS IMPORTANTE: Asegúrate de que la ruta al contexto sea correcta.
import { useCart } from '../context/CartContext.jsx';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Se conecta al contexto y obtiene la función 'addToCart'.
    const { addToCart } = useCart();
    
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return (
            <Container className="my-5 text-center">
                <Text variant="h2">Producto no encontrado</Text>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Button variant="secondary" onClick={() => navigate('/products')} className="mb-3">
                &larr; Volver
            </Button>
            <Card>
                <Image src={product.image} alt={product.name} className="card-img-top" />
                <Card.Body>
                    <Text variant="h2">{product.name}</Text>
                    <Text variant="p">{product.description}</Text>
                    <Text variant="h3" className="my-3">
                        {product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                    </Text>

                    {/* Este onClick ahora está garantizado que funciona */}
                    <Button
                        variant="success"
                        onClick={() => addToCart(product)}
                        size="lg"
                        className="w-100"
                    >
                        Agregar al carrito
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductDetail;