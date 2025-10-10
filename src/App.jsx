import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Nosotros from './pages/Nosotros';
import BlogDetail from './pages/BlogsDetail';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} /> 
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
