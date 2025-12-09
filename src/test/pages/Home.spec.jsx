import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import Home from "../../pages/Home"; 

describe("Pagina Home", () => {
    it("renderiza el título y slogan", () => {
        render(<Home />); 
        // Busca encabezado H1 explícitamente para asegurar semántica
        expect(screen.getByRole('heading', { level: 1, name: "MASCAPITOS STORE" })).toBeInTheDocument();
        expect(screen.getByText("Elegancia en cada esencia.")).toBeInTheDocument();
    });
    
    it("aplica el estilo de fondo principal", () => {
        const { container } = render(<Home />);
        expect(container.firstChild).toHaveClass('bg-theme-main');
    });
});