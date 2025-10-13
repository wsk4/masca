import React, { useState } from 'react';
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
  const { addToCart } = useCart();
  
  // Estado para dar feedback al usuario al agregar un producto
  const [isAdded, setIsAdded] = useState(false);

  // Encontrar el producto. Es más seguro hacerlo dentro del componente.
  const product = products.find((p) => p.id === parseInt(id));

  // Manejador para el evento de agregar al carrito
  const handleAddToCart = () => {
    // 1. Llama a la función del contexto para agregar el producto
    addToCart(product);
    
    // 2. Activa el estado de "agregado" para dar feedback visual
    setIsAdded(true);

    // 3. Después de 2 segundos, revierte el estado para que el botón vuelva a la normalidad
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Si el producto no se encuentra, muestra un mensaje y termina la ejecución
  if (!product) {
    return (
      <Container className="my-5 text-center">
        <Text variant="h2">Producto no encontrado</Text>
        <Text variant="p" className="my-3">El producto que buscas no existe o fue removido.</Text>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  // Renderizado del componente si el producto existe
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

          <Button 
            variant={isAdded ? "outline-success" : "success"}
            onClick={handleAddToCart}
            disabled={isAdded}
            size="lg"
            className="w-100"
          >
            {isAdded ? '✅ ¡Agregado!' : 'Agregar al carrito'}
          </Button>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;