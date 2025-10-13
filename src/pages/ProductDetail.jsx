// RUTA: src/pages/ProductDetail.jsx

import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/Products.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import '../styles/CardBody.css'; 

// ASEGÚRATE DE QUE ESTA RUTA SEA 100% CORRECTA
import { useCart } from '../context/CartContext.jsx';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Si la importación de arriba es incorrecta, 'useCart()' no funcionará
    // y 'addToCart' será undefined, por eso el botón no hace nada.
    const { addToCart } = useCart();
    
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return (
            <Container className="my-5 text-center">
                <Text variant="h2">Producto no encontrado</Text>
            </Container>
        );
    }

    const handleAddToCart = () => {
        // console.log para verificar que la función existe antes de llamarla
        console.log('Llamando a addToCart con:', product);
        if (typeof addToCart === 'function') {
            addToCart(product);
            alert('¡Producto agregado!'); // Feedback inmediato
        } else {
            alert('ERROR: ¡La función addToCart no se encontró! Revisa la importación del contexto.');
        }
    };

    return (
        <Container className="my-5">
            <Button variant="secondary" onClick={() => navigate('/products')} className="mb-3">
                &larr; Volver
            </Button>
            <Card>
                <Image src={product.image} alt={product.name} className="card-img-top" />
                <Card.Body>
                    <Text variant="h2" className="card-price">{product.name}</Text>
                    <Text variant="p" className="card-price">{product.description}</Text>
                    <Text variant="h3" className="my-3 card-price">
                        {product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                    </Text>

                    <Button
                        variant="success"
                        onClick={handleAddToCart}
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