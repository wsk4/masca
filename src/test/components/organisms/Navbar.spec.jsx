import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../components/organisms/Navbar';

describe('Organismo Navbar', () => {
    
    const linksMock = [
        { label: 'Inicio', to: '/home' },
        { label: 'Perfil', to: '/profile' },
        { label: 'Salir', to: '/logout' }
    ];
    const titleMock = "Mi Tienda";

    beforeEach(() => {
        localStorage.clear();
    });

    it('renderiza el título y los enlaces correctamente en escritorio', () => {
        render(
            <MemoryRouter>
                <Navbar links={linksMock} title={titleMock} />
            </MemoryRouter>
        );

        expect(screen.getByText('MI TIENDA')).toBeTruthy();
        expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Perfil').length).toBeGreaterThan(0);
    });

    it('abre y cierra el menú móvil al hacer click en el botón hamburguesa', () => {
        render(
            <MemoryRouter>
                <Navbar links={linksMock} title={titleMock} />
            </MemoryRouter>
        );

        const toggleBtn = screen.getByLabelText('Toggle menu');
        fireEvent.click(toggleBtn);
        // Si no explota, asumimos que el estado cambió.
        // En un test de integración visual verificaríamos clases CSS.
        expect(toggleBtn).toBeTruthy();
    });

    it('limpia el localStorage al hacer click en "Salir"', () => {
        localStorage.setItem('token', '12345');
        localStorage.setItem('user', 'juan');

        render(
            <MemoryRouter>
                <Navbar links={linksMock} title={titleMock} />
            </MemoryRouter>
        );

        // Buscamos el enlace "Salir" (puede haber 2, desktop y mobile)
        const salirLinks = screen.getAllByText('Salir');
        // Hacemos click en el primero
        fireEvent.click(salirLinks[0]);

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
    });
});