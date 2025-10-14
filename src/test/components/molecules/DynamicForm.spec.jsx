import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/atoms/Button";

describe("Button Component", () => {
  it("renderiza el botón correctamente", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeTruthy(); 
  });

  it("usa el tipo 'button' por defecto", () => {
    render(<Button>Default</Button>);
    const buttonElement = screen.getByText("Default");
    expect(buttonElement.getAttribute("type")).toBe("button"); 
  });

  it("aplica correctamente el tipo 'submit'", () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByText("Submit");
    expect(buttonElement.getAttribute("type")).toBe("submit"); 
  });

  it("aplica correctamente la clase CSS pasada por props", () => {
    render(<Button className="btn-test">Clase</Button>);
    const buttonElement = screen.getByText("Clase");
    expect(buttonElement.className).toContain("btn-test"); 
  });

  it("dispara la función onClick cuando se hace click", () => {
    const handleClick = jasmine.createSpy("handleClick");
    render(<Button onClick={handleClick}>Click</Button>);
    const buttonElement = screen.getByText("Click");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled(); 
  });
});