import React from 'react';
import { Container } from 'react-bootstrap';
import Image from '../components/atoms/Image';

const image = {
    src: '/img/momoerror.webp',
    alt: 'Not Found Image',
}

function NotFound() {
  return (
    <Container className="my-5">
      <h1>Página no encontrada</h1>
      <p>¿Estás seguro de que era aquí?</p>
      
      <Image src={image.src} alt={image.alt} className="" />
    </Container>
  );
}

export default NotFound;
