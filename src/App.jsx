import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

         <Card style={{ width: '18rem' }} className="m-2">
      <Image src={product.image} alt={product.name} className="card-img-top" />
      <Card.Body>
        <CardBody
          title={product.name}
          description={product.description}
          price={product.price}
        />
        <Button variant="primary" onClick={() => navigate(`/products/${product.id}`)}>
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
    </>
    
  );
  
}


export default App;