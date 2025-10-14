import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard'; 

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

describe('ProductCard Component', () => {
  const productMock = {
    id: 123,
    name: 'Perfume de Prueba',
    description: 'Una descripción para el perfume de prueba.',
    price: 50000,
    image: '/img/perfume-test.webp',
  };

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductCard product={productMock} />} />
          <Route path="/products/:id" element={<h1>Página de Detalle</h1>} />
        </Routes>
        <LocationDisplay />
      </MemoryRouter>
    );
  };


  it('muestra el nombre, descripción y precio del producto', () => {
    renderComponent();
    
    expect(screen.getByText(productMock.name)).toBeTruthy();
    expect(screen.getByText(productMock.description)).toBeTruthy();
    expect(screen.getByText(/50/i)).toBeTruthy(); 
  });

  it('muestra la imagen con el alt y src correctos', () => {
    renderComponent();
    
    const img = screen.getByAltText(productMock.name);
    expect(img).toBeTruthy();
    
    expect(img.src).toContain(productMock.image);
  });

  it("muestra el botón 'Ver detalles'", () => {
    renderComponent();
    
    const button = screen.getByRole('button', { name: /ver detalles/i });
    expect(button).toBeTruthy();
  });

  it("navega a la URL correcta al hacer clic en 'Ver detalles'", () => {
    renderComponent();

    expect(screen.getByTestId('location-display').textContent).toBe('/');


    const button = screen.getByRole('button', { name: /ver detalles/i });
    fireEvent.click(button);

    expect(screen.getByTestId('location-display').textContent).toBe(`/products/${productMock.id}`);
  });
});