import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // ✅ Necesario para useNavigate()
import Home from "../../pages/Home";

describe("Home Page", () => {
  // Función helper para no repetir el wrapper
  const renderHome = () =>
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

  it("renderiza el título de la página de inicio", () => {
    renderHome();
    const title = screen.getByText("Mascapitos Store");
    expect(title).toBeTruthy();
  });

  it("renderiza el párrafo de bienvenida", () => {
    renderHome();
    const paragraph = screen.getByText(
      /Nuestra tienda online ofrece productos seleccionados/i
    );
    expect(paragraph).toBeTruthy();
  });

  it("renderiza el contenedor de Bootstrap", () => {
    const { container } = renderHome();
    const bootstrapContainer = container.querySelector(".container.my-5");
    expect(bootstrapContainer).toBeTruthy();
    expect(bootstrapContainer).toHaveClass("container");
    expect(bootstrapContainer).toHaveClass("my-5");
  });
});
