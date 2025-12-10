import React from "react";
import { render, screen } from "@testing-library/react";
// ⚠️ IMPORTANTE: Ajusta esta ruta a tu componente Home.jsx si es necesario
// Según tu estructura de carpetas, esto debería apuntar a src/pages/Home.jsx
import Home from "../../pages/Home"; 

describe("Pagina Home", () => {

    it("debería renderizar el título principal estático", () => {
        // Renderizamos la página
        render(<Home />); 

        // Verificamos el texto principal (MASCAPITOS STORE)
        const title = screen.getByText("MASCAPITOS STORE"); 
        
        expect(title).toBeTruthy();
        expect(title.tagName).toBe('H1'); // Verificamos que se renderice como H1
        
        // Verificamos el subtítulo/slogan
        expect(screen.getByText("Elegancia en cada esencia.")).toBeTruthy();
    });
    
    it("debería aplicar el estilo de fondo principal", () => {
        const { container } = render(<Home />);
        
        // Verificamos que el <main> (el contenedor más externo) tenga la clase de fondo
        expect(container.firstChild.className).toContain('bg-theme-main');
    });
});