import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/Products.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
// No necesitamos el 'useCart' para esta prueba

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  // --- LA PRUEBA MÁS IMPORTANTE ---
  // Esta función solo mostrará una alerta.
  const handleTestClick = () => {
    alert('¡EL BOTÓN SÍ FUNCIONA!');
  };
  // ---------------------------------

  if (!product) {
    return <Container className="my-5"><h1>Producto no encontrado</h1></Container>;
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
          <Text variant="p">{product.description}</Text>
          <Text variant="h3" className="my-3">
            {product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
          </Text>
          
          {/* Aquí llamamos a nuestra función de prueba */}
          <Button 
            variant="success"
            onClick={handleTestClick} 
            size="lg"
          >
            Probar Botón
          </Button>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;