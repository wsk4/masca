import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/Products.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import { useCart } from '../context/CartContext.jsx';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Obtenemos la función directamente del contexto
  const { addToCart } = useCart();

  // Buscamos el producto
  const product = products.find((p) => p.id === parseInt(id));

  // Manejo de producto no encontrado
  if (!product) {
    return (
      <Container className="my-5 text-center">
        <Text variant="h2">Producto no encontrado</Text>
        <Button variant="primary" onClick={() => navigate('/products')} className="mt-3">
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="secondary" onClick={() => navigate(`/products`)} className="mb-3">
        &larr; Volver
      </Button>
      <Card>
        <Image src={product.image} alt={product.name} className="card-img-top" />
        <Card.Body>
          <Text variant="h2">{product.name}</Text>
          <Text variant="p" className="text-muted">{product.description}</Text>
          <Text variant="h3" className="my-3">
            {product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
          </Text>

          {/* --- LÍNEA CLAVE CORREGIDA --- */}
          {/*
            El onClick ahora llama directamente a addToCart, pasándole el objeto 'product'.
            Esto garantiza que la función del contexto se ejecute correctamente.
          */}
          <Button 
            variant="success"
            onClick={() => addToCart(product)}
            size="lg"
            className="w-100"
          >
            Agregar al carrito
          </Button>
          {/* --------------------------- */}

        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;