import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../../pages/Contact'; 

describe('Contact Component', () => {

  it('should render the contact form correctly', () => {
    render(<Contact />);

    expect(screen.getByText('Contacto')).toBeTruthy();

    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingrese el mensaje')).toBeTruthy();

    expect(screen.getByRole('button', { name: /enviar/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeTruthy();
  });

  it('should update form fields when user types', () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const messageInput = screen.getByPlaceholderText('Ingrese el mensaje');

    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@correo.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hola mundo' } });

    expect(nameInput.value).toBe('Juan Pérez');
    expect(emailInput.value).toBe('juan@correo.com');
    expect(messageInput.value).toBe('Hola mundo');
  });
  
  it('should clear the form fields when clear button is clicked', () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    
    fireEvent.change(nameInput, { target: { value: 'Algo para borrar' } });
    expect(nameInput.value).toBe('Algo para borrar');
    
    fireEvent.click(clearButton);
    
    expect(nameInput.value).toBe('');
  });

  it('should show an alert with form data on submit', () => {
    spyOn(window, 'alert');
    
    render(<Contact />);
    
    const nameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const messageInput = screen.getByPlaceholderText('Ingrese el mensaje');
    const submitButton = screen.getByRole('button', { name: /enviar/i });

    fireEvent.change(nameInput, { target: { value: 'Ana López' } });
    fireEvent.change(emailInput, { target: { value: 'ana@correo.com' } });
    fireEvent.change(messageInput, { target: { value: 'Consulta.' } });
    
    fireEvent.click(submitButton);
    
    const expectedMessage = `Nombre: Ana López\nCorreo: ana@correo.com\nMensaje: Consulta.`;
    
    expect(window.alert).toHaveBeenCalledWith(expectedMessage);
  });
});