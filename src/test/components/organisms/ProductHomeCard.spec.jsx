import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductHomeCard from "../../../components/organisms/productHomeCard";

describe("ProductHomeCard", () => {
  const productoMock = {
    id: 1,
    nombre: "Perfume Test",
    marca: "Marca Test",
    precio: 9999,
    image: "/img/test-perfume.webp"
  };

  const mockNavigate = () => {};
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ProductHomeCard producto={productoMock} />
      </MemoryRouter>
    );

  it("muestra el nombre del producto", () => {
    renderComponent();
    expect(screen.getByText(productoMock.nombre)).toBeDefined();
  });

  it("muestra la marca del producto", () => {
    renderComponent();
    expect(screen.getByText(productoMock.marca)).toBeDefined();
  });

  it("muestra la imagen con alt correcto", () => {
    renderComponent();
    const img = screen.getByAltText(productoMock.nombre);
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe(productoMock.image);
  });

  it("botón 'Ver detalles' existe", () => {
    renderComponent();
    const button = screen.getByText(/Ver detalles/i);
    expect(button).toBeDefined();
  });
});
