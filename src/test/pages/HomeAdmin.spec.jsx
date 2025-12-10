import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import HomeAdmin from './HomeAdmin'; 

describe('HomeAdmin (Karma + Jasmine Nativo)', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('renderiza el título principal correctamente', () => {
        act(() => {
            ReactDOM.render(
                <MemoryRouter>
                    <HomeAdmin />
                </MemoryRouter>,
                container
            );
        });

        const h1 = container.querySelector('h1');
        expect(h1.textContent).toBe('DASHBOARD');
    });

    it('renderiza todos los módulos de administración (enlaces)', () => {
        act(() => {
            ReactDOM.render(
                <MemoryRouter>
                    <HomeAdmin />
                </MemoryRouter>,
                container
            );
        });

        // Seleccionamos todos los tags <a>
        const links = container.querySelectorAll('a');
        
        // Filtramos aquellos que van a /admin/ para asegurarnos que son los módulos
        // Convertimos NodeList a Array para usar filter
        const adminModules = Array.from(links).filter(link => 
            link.getAttribute('href') && link.getAttribute('href').startsWith('/admin/')
        );

        // Deberían ser 7 módulos según tu array constante
        expect(adminModules.length).toBe(7);
    });

    it('los enlaces apuntan a las rutas correctas', () => {
        act(() => {
            ReactDOM.render(
                <MemoryRouter>
                    <HomeAdmin />
                </MemoryRouter>,
                container
            );
        });

        const links = Array.from(container.querySelectorAll('a'));

        // Buscamos enlace de Usuarios
        const userLink = links.find(l => l.textContent.includes('Usuarios'));
        expect(userLink.getAttribute('href')).toBe('/admin/usuarios');

        // Buscamos enlace de Perfumes
        const perfumesLink = links.find(l => l.textContent.includes('Perfumes'));
        expect(perfumesLink.getAttribute('href')).toBe('/admin/perfumes');
    });

    it('el botón de volver existe y tiene el texto correcto', () => {
        act(() => {
            ReactDOM.render(
                <MemoryRouter>
                    <HomeAdmin />
                </MemoryRouter>,
                container
            );
        });

        const buttons = container.querySelectorAll('button');
        // Buscamos el botón específico por su texto
        const backButton = Array.from(buttons).find(b => 
            b.textContent.includes('Volver a Vista Usuario')
        );

        expect(backButton).not.toBeNull();
    });
});