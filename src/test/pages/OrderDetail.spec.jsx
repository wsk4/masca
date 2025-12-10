import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";

describe("Pagina Home", () => {

    it("debería renderizar el título principal estático", () => {
        render(<Home />); 

        const title = screen.getByText("MASCAPITOS STORE"); 
        
        expect(title).toBeTruthy();
        expect(title.tagName).toBe('H1'); 
        
        expect(screen.getByText("Elegancia en cada esencia.")).toBeTruthy();
    });
    
    it("debería aplicar el estilo de fondo principal", () => {
        const { container } = render(<Home />);
        
        expect(container.firstChild.className).toContain('bg-theme-main');
    });
});