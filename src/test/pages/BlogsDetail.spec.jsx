import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogDetail from '../../pages/BlogsDetail';

const mockBlogs = [
  { id: 1, title: 'Me compré un perfume', content: 'Contenido del blog 1' },
  { id: 2, title: 'Otro blog', content: 'Contenido del blog 2' },
];

describe('BlogDetail Page', () => {
  it('muestra un blog existente correctamente', () => {
    render(
      <MemoryRouter initialEntries={['/blogs/1']}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail blogs={mockBlogs} />} />
        </Routes>
      </MemoryRouter>
    );

    const titleElement = screen.getByText((content) =>
      content.includes('Me compré un perfume')
    );

    expect(titleElement).toBeDefined();
  });

  it('muestra mensaje de blog no encontrado para un id inválido', () => {
    render(
      <MemoryRouter initialEntries={['/blogs/999']}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail blogs={mockBlogs} />} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundElement = screen.getByText((content) =>
      content.includes('Caso no encontrado')
    );

    expect(notFoundElement).toBeDefined();
  });
});
