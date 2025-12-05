import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CrearEditarCategoria from '../CrearEditarCategoria';


const MockCreateModal = ({ isOpen, onClose, onSubmit, inputsConfig, title, submitText, loading, initialData }) => (
    <div data-testid="mock-create-modal">
        <span data-testid="modal-title">{title}</span>
        <span data-testid="modal-loading">{loading.toString()}</span>
        <span data-testid="modal-submit-text">{submitText}</span>
        <span data-testid="modal-is-open">{isOpen.toString()}</span>
        
        
        {inputsConfig && inputsConfig.length > 0 && (
            <div data-testid="input-config">
                <span data-testid="input-name">{inputsConfig[0].name}</span>
                <span data-testid="input-placeholder">{inputsConfig[0].placeholder}</span>
                <span data-testid="input-value">{inputsConfig[0].value}</span>
            </div>
        )}

        <button onClick={onClose} data-testid="close-button">Close</button>
        <button onClick={onSubmit} data-testid="submit-button">Submit</button>
    </div>
);


jest.mock("../../../components/organisms/CreateModal", () => MockCreateModal);


describe('CrearEditarCategoria', () => {
    
    
    const mockOnClose = jest.fn();
    const mockOnSubmit = jest.fn();

    
    it('debe renderizar en modo "Crear categoría" y con campo vacío', () => {
        render(
            <CrearEditarCategoria 
                isOpen={true} 
                onClose={mockOnClose} 
                onSubmit={mockOnSubmit} 
                initialData={null} 
                loading={false}
            />
        );

        
        expect(screen.getByTestId('modal-title')).toHaveTextContent('Crear categoría');

        
        const inputConfig = screen.getByTestId('input-config');
        expect(inputConfig).toBeInTheDocument();
        expect(screen.getByTestId('input-name')).toHaveTextContent('nombre');
        expect(screen.getByTestId('input-placeholder')).toHaveTextContent('Nombre');
        
        
        expect(screen.getByTestId('input-value')).toHaveTextContent('');

        
        expect(screen.getByTestId('modal-loading')).toHaveTextContent('false');
        
       
        expect(screen.getByTestId('modal-submit-text')).toHaveTextContent('Guardar');
    });

    
    it('debe renderizar en modo "Editar categoría" y cargar datos iniciales', () => {
        const testData = { id: 5, nombre: "Categoría de Prueba" };
        
        render(
            <CrearEditarCategoria 
                isOpen={true} 
                onClose={mockOnClose} 
                onSubmit={mockOnSubmit} 
                initialData={testData} 
                loading={true}
            />
        );

        
        expect(screen.getByTestId('modal-title')).toHaveTextContent('Editar categoría');

        
        expect(screen.getByTestId('input-value')).toHaveTextContent(testData.nombre);

        
        expect(screen.getByTestId('modal-loading')).toHaveTextContent('true');
    });
    
    
    it('debe pasar las funciones onClose y onSubmit correctamente', async () => {
        const user = userEvent.setup();
        
        render(
            <CrearEditarCategoria 
                isOpen={true} 
                onClose={mockOnClose} 
                onSubmit={mockOnSubmit} 
                initialData={null} 
                loading={false}
            />
        );
        
        
        await user.click(screen.getByTestId('close-button'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);

        
        await user.click(screen.getByTestId('submit-button'));
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
});