import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import BlogCard from '../../../components/organisms/BlogsCard'; 

const mockBlog = {
  id: 101,
  title: 'Título del Blog de Prueba',
  summary: 'Este es un resumen breve para probar el componente.',
};

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};


describe('BlogCard Component', () => {


  it('should render the blog title, summary, and button', () => {
    render(
      <MemoryRouter>
        <BlogCard blog={mockBlog} />
      </MemoryRouter>
    );

    expect(screen.getByText('Título del Blog de Prueba')).toBeTruthy();
    expect(screen.getByText(/resumen breve para probar/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /ver caso/i })).toBeTruthy();
  });


  it('should navigate to the correct path on button click', () => {
    render(

      <MemoryRouter initialEntries={['/blogs']}>
        <Routes>

          <Route path="/blogs" element={<BlogCard blog={mockBlog} />} />

          <Route path="/blogs/:id" element={<h1>Página de Destino</h1>} />
        </Routes>

        <LocationDisplay />
      </MemoryRouter>
    );


    expect(screen.getByTestId('location-display').textContent).toBe('/blogs');


    const button = screen.getByRole('button', { name: /ver caso/i });
    fireEvent.click(button);

    expect(screen.getByTestId('location-display').textContent).toBe('/blogs/101');
  });
});