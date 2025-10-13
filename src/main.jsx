// src/main.jsx

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx'; // Asegúrate de que la ruta sea correcta

// ESTA ESTRUCTURA ES LA CLAVE DEL ÉXITO
// BrowserRouter -> CartProvider -> App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);