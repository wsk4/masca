import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blogs from '../../pages/Blogs.jsx';
import blogs from '../../data/Blogs.js';

function renderWithRouter(component) {
    return render(<MemoryRouter>{component}</MemoryRouter>);
}

describe('Blogs Page', () => {
    it('muestra el título y el párrafo de presentación', () => {
        renderWithRouter(<Blogs />);

        expect(screen.getByText('Casos curiosos')).toBeTruthy();
        expect(
            screen.getByText(
                'En esta sección encontrarás algunas experiencias divertidas y reales de nuestros clientes. ¡Porque en Mascapitos Store cada aroma tiene una historia!'
            )
        ).toBeTruthy();
    });

    it('renderiza todas las BlogCard', () => {
        renderWithRouter(<Blogs />);

        const blogCards = document.querySelectorAll('.blog-card');
        expect(blogCards.length).toBe(blogs.length);
    });

    it('cada BlogCard tiene un botón "Ver caso"', () => {
        renderWithRouter(<Blogs />);

        const buttons = screen.getAllByText('Ver caso');
        expect(buttons.length).toBe(blogs.length);
    });
});
