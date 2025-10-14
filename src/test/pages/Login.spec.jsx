import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login'; 

describe('Login Component', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('should render the login form correctly', () => {
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    expect(screen.getByText(/Llena el formulario para ingresar/i)).toBeTruthy();

    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();

    expect(screen.getByRole('button', { name: /ingresar/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeTruthy();
  });

  it('should update form fields when user types', () => {
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');


    fireEvent.change(emailInput, { target: { value: 'usuario@ejemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'miClave123' } });


    expect(emailInput.value).toBe('usuario@ejemplo.com');
    expect(passwordInput.value).toBe('miClave123');
  });

  it('should clear the form fields when clear button is clicked', () => {
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    

    fireEvent.change(emailInput, { target: { value: 'texto.para.borrar@mail.com' } });
    expect(emailInput.value).toBe('texto.para.borrar@mail.com');
    

    fireEvent.click(clearButton);
    

    expect(emailInput.value).toBe('');
  });

  it('should show a welcome alert on submit', () => {
    spyOn(window, 'alert');
    
    const submitButton = screen.getByRole('button', { name: /ingresar/i });


    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), { target: { value: 'usuario@ejemplo.com' } });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), { target: { value: 'miClave123' } });
    

    fireEvent.click(submitButton);
    

    expect(window.alert).toHaveBeenCalledWith('bienveindo');
  });
});