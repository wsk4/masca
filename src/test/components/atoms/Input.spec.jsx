import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../../../components/atoms/Input";

describe("Input Component", () => {
  it("renderiza el input correctamente", () => {
    render(<Input placeholder="Escribe algo" />);
    const inputElement = screen.getByPlaceholderText("Escribe algo");
    expect(inputElement).toBeTruthy(); 
  });

  it("usa el tipo 'text' por defecto", () => {
    render(<Input placeholder="Texto por defecto" />);
    const inputElement = screen.getByPlaceholderText("Texto por defecto");
    expect(inputElement.getAttribute("type")).toBe("text"); 
  });

  it("aplica correctamente el tipo 'password'", () => {
    render(<Input type="password" placeholder="Contraseña" />);
    const inputElement = screen.getByPlaceholderText("Contraseña");
    expect(inputElement.getAttribute("type")).toBe("password"); 
  });

  it("usa <textarea> cuando type='textarea'", () => {
    render(<Input type="textarea" placeholder="Comentario" />);
    const textareaElement = screen.getByPlaceholderText("Comentario");
    expect(textareaElement.tagName.toLowerCase()).toBe("textarea"); 
  });

  it("aplica correctamente la clase CSS pasada por props", () => {
    render(<Input className="input-prueba" placeholder="Campo" />);
    const inputElement = screen.getByPlaceholderText("Campo");
    expect(inputElement.className).toContain("input-prueba"); 
  });
});