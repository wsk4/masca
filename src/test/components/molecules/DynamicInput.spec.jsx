import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// ⚠️ Ajusta si el nombre de tu archivo es 'DynamicInputs.jsx' o 'DynamicInput.jsx'
import DynamicInputs from '../../../components/molecules/DynamicInput'; 

describe('Molecula DynamicInputs', () => {

    it('renderiza correctamente un input de texto estándar', () => {
        const inputsConfig = [
            { 
                type: 'text', 
                name: 'nombre', 
                placeholder: 'Escribe tu nombre', 
                value: 'Juan', 
                onChange: () => {},
                required: true 
            }
        ];

        render(<DynamicInputs Inputs={inputsConfig} />);

        // Buscamos por el placeholder
        const inputElement = screen.getByPlaceholderText('Escribe tu nombre');
        
        expect(inputElement).toBeTruthy();
        expect(inputElement.value).toBe('Juan');
        expect(inputElement.getAttribute('name')).toBe('nombre');
        expect(inputElement.required).toBe(true);
    });

    it('renderiza correctamente un select con etiqueta y opciones', () => {
        const inputsConfig = [
            { 
                type: 'select', 
                name: 'region', 
                label: 'Selecciona Región',
                value: '',
                options: [
                    { id: 1, label: 'Norte' },
                    { id: 2, label: 'Sur' }
                ],
                onChange: () => {} 
            }
        ];

        render(<DynamicInputs Inputs={inputsConfig} />);

        // 1. Verificamos que aparezca el texto del label
        expect(screen.getByText('Selecciona Región')).toBeTruthy();

        // 2. Verificamos el select (se identifica por el rol 'combobox')
        const selectElement = screen.getByRole('combobox'); 
        expect(selectElement).toBeTruthy();
        expect(selectElement.getAttribute('name')).toBe('region');

        // 3. Verificamos que las opciones estén presentes en el documento
        expect(screen.getByText('Seleccione...')).toBeTruthy();
        expect(screen.getByText('Norte')).toBeTruthy();
        expect(screen.getByText('Sur')).toBeTruthy();
    });

    it('dispara el evento onChange en un input de texto', () => {
        const handleChange = jasmine.createSpy('handleChange');
        const inputsConfig = [
            { type: 'text', placeholder: 'Testing Change', onChange: handleChange }
        ];

        render(<DynamicInputs Inputs={inputsConfig} />);

        const input = screen.getByPlaceholderText('Testing Change');
        
        // Simulamos escribir
        fireEvent.change(input, { target: { value: 'Hola Mundo' } });

        expect(handleChange).toHaveBeenCalled();
    });

    it('dispara el evento onChange en un select', () => {
        const handleChange = jasmine.createSpy('handleChange');
        const inputsConfig = [
            { 
                type: 'select', 
                label: 'Test Select',
                options: [{ id: 'opcion1', label: 'Opción 1' }],
                onChange: handleChange 
            }
        ];

        render(<DynamicInputs Inputs={inputsConfig} />);

        const select = screen.getByRole('combobox');
        
        // Simulamos seleccionar una opción
        fireEvent.change(select, { target: { value: 'opcion1' } });

        expect(handleChange).toHaveBeenCalled();
    });

    it('aplica la clase CSS personalizada al contenedor de cada input', () => {
        const inputsConfig = [{ type: 'text', placeholder: 'Input con clase' }];
        const testClass = 'mi-clase-layout';

        const { container } = render(<DynamicInputs Inputs={inputsConfig} className={testClass} />);

        // Tu componente envuelve cada input en un <div> con la clase pasada.
        // Buscamos ese div específico.
        const wrapperDiv = container.querySelector(`.${testClass}`);
        
        expect(wrapperDiv).toBeTruthy();
    });
});