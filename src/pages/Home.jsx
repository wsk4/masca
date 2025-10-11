import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container className="my-5">
      <h1>Página de Inicio</h1>
      <p>Bienvenidos a nuestro sitio web.</p>
      <div class="section grey lighten-3">
        <div class="container row valign-wrapper">
          <div class="col s12 m6">
            <h4>Mascapitos Store</h4>
            <p>
              Nuestra tienda online ofrece productos seleccionados de todas las regiones. 
              Encuentra lo que necesitas al mejor precio.
            </p>
          </div>
        </div>
    </div>
    </Container>
    
  );
}

export default Home;
