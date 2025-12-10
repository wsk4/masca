import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateModal from '../../../components/organisms/CreateModal';



describe('Organismo CreateModal', () => {

    const mockOnClose = jasmine.createSpy('onClose');
    const mockOnSubmit = jasmine.createSpy('onSubmit');

    const defaultProps = {
        isOpen: true,
        onClose: mockOnClose,
        onSubmit: mockOnSubmit,
        inputsConfig: [
            { name: 'nombre', placeholder: 'Nombre del Producto', type: 'text' },
            { name: 'precio', placeholder: 'Precio', type: 'number' },
            { name: 'logo', type: 'file' }
        ]
    };

    beforeEach(() => {
        mockOnClose.calls.reset();
        mockOnSubmit.calls.reset();
    });

    it('no renderiza nada si isOpen es false', () => {
        const { container } = render(<CreateModal {...defaultProps} isOpen={false} />);
        expect(container.innerHTML).toBe('');
    });

    it('renderiza el modal y los inputs configurados cuando isOpen es true', () => {
        render(<CreateModal {...defaultProps} />);

        expect(screen.getByText('Crear nuevo')).toBeTruthy();
        expect(screen.getByText('Nombre del Producto')).toBeTruthy();
        expect(screen.getByText('Precio')).toBeTruthy();
        expect(screen.getByText('Logo')).toBeTruthy();
    });

    it('actualiza los valores del formulario al escribir', () => {
        render(<CreateModal {...defaultProps} />);

        const nombreInput = screen.getByPlaceholderText('Nombre del Producto');
        fireEvent.change(nombreInput, { target: { value: 'Nuevo Producto' } });

        expect(nombreInput.value).toBe('Nuevo Producto');
    });

    it('llama a onClose cuando se hace click en Cancelar', () => {
        render(<CreateModal {...defaultProps} />);

        const btnCancelar = screen.getByText('Cancelar');
        fireEvent.click(btnCancelar);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('llama a onSubmit con los datos del formulario al guardar', () => {
        render(<CreateModal {...defaultProps} />);

        const nombreInput = screen.getByPlaceholderText('Nombre del Producto');
        fireEvent.change(nombreInput, { target: { value: 'Producto Test' } });

        const btnGuardar = screen.getByText('Guardar');
        fireEvent.click(btnGuardar);

        expect(mockOnSubmit).toHaveBeenCalled();
        expect(mockOnSubmit).toHaveBeenCalledWith(jasmine.objectContaining({
            nombre: 'Producto Test'
        }));
    });

    it('renderiza el estado de carga cuando loading es true', () => {
        render(<CreateModal {...defaultProps} loading={true} />);
        
        expect(screen.getByText('Guardando...')).toBeTruthy();
    });
});