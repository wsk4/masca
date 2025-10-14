import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CrearUsuario from '../../pages/CrearUsuario';

describe('CrearUsuario Component', () => {
  beforeEach(() => {
    render(<CrearUsuario />);
  });

  it('should render the registration form correctly', () => {
    expect(screen.getByText('Registro usuario')).toBeTruthy();

    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Repite tu correo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('Repite tu contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingresa tu teléfono')).toBeTruthy();

    expect(screen.getByText('Seleccione su región')).toBeTruthy();
    expect(screen.getByText('Seleccione su comuna')).toBeTruthy();

    expect(screen.getByRole('button', { name: /registrar/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeTruthy();
  });

  it('should update form fields when user interacts with them', () => {
    const nombreInput = screen.getByPlaceholderText('Ingresa tu nombre');
    fireEvent.change(nombreInput, { target: { value: 'Jane Doe' } });
    expect(nombreInput.value).toBe('Jane Doe');
    

    const regionSelect = screen.getByDisplayValue('Seleccione su región');
    fireEvent.change(regionSelect, { target: { value: 'Valparaíso' } });
    expect(regionSelect.value).toBe('Valparaíso');
  });


  it('should show an alert if emails do not match on submit', () => {
    spyOn(window, 'alert');

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Repite tu correo'), { target: { value: 'diferente@test.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    expect(window.alert).toHaveBeenCalledWith('Los correos no coinciden');
  });

  it('should show an alert if passwords do not match on submit', () => {
    spyOn(window, 'alert');

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Repite tu contraseña'), { target: { value: 'abcdef' } });
    
    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });


  it('should clear all fields when "Limpiar" button is clicked', () => {
    const nombreInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const regionSelect = screen.getByDisplayValue('Seleccione su región');


    fireEvent.change(nombreInput, { target: { value: 'Datos para limpiar' } });
    fireEvent.change(regionSelect, { target: { value: 'Biobío' } });


    fireEvent.click(screen.getByRole('button', { name: /limpiar/i }));


    expect(nombreInput.value).toBe('');
    expect(regionSelect.value).toBe(''); 
  });


  it('should show success alert with correct data on successful submit', () => {
    spyOn(window, 'alert');

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByPlaceholderText('Repite tu correo'), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), { target: { value: 'securepass' } });
    fireEvent.change(screen.getByPlaceholderText('Repite tu contraseña'), { target: { value: 'securepass' } });
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu teléfono'), { target: { value: '987654321' } });
    fireEvent.change(screen.getByDisplayValue('Seleccione su región'), { target: { value: 'Región Metropolitana' } });
    fireEvent.change(screen.getByDisplayValue('Seleccione su comuna'), { target: { value: 'Santiago' } });


    fireEvent.click(screen.getByRole('button', { name: /registrar/i }));


    const expectedMessage = `
      Nombre: John Doe
      Correo: john@doe.com
      Teléfono: 987654321
      Región: Región Metropolitana
      Comuna: Santiago
    `;
    const cleanExpected = expectedMessage.replace(/\s+/g, ' ').trim();
    const cleanActual = window.alert.calls.mostRecent().args[0].replace(/\s+/g, ' ').trim();
    
    expect(cleanActual).toEqual(cleanExpected);
  });
});