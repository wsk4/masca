import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CrearEditarPerfume from '../../pages/Admin/perfumes/CrearEditarPerfume'; 


const mockGetAllMarcas = jest.fn();
const mockGenerarMensaje = jest.fn();


jest.mock('../../../service/MarcaService', () => ({
    getAll: mockGetAllMarcas,
}));
jest.mock('../../../utils/GenerarMensaje', () => ({
    generarMensaje: mockGenerarMensaje,
}));


const MockCreateModal = ({ isOpen, onClose, onSubmit, inputsConfig, title, submitText, loading, initialData }) => (
    <div data-testid="mock-create-modal">
        <span data-testid="modal-title">{title}</span>
        <span data-testid="modal-loading">{loading.toString()}</span>
        <span data-testid="modal-submit-text">{submitText}</span>
        <span data-testid="modal-is-open">{isOpen.toString()}</span>
        
        {inputsConfig && inputsConfig.length > 5 && (
            <div data-testid="input-config">
                <span data-testid="input-nombre-value">{inputsConfig[0].value}</span>
                <span data-testid="input-precio-type">{inputsConfig[2].type}</span>
                <span data-testid="input-marca-options-count">{inputsConfig[5].options.length}</span>
                <span data-testid="input-marca-value">{inputsConfig[5].value}</span>
                
                <input name="nombre" onChange={e => onSubmit({ nombre: e.target.value })} />
                <input name="precio" onChange={e => onSubmit({ precio: e.target.value })} />
                <input name="stock" onChange={e => onSubmit({ stock: e.target.value })} />
                <select name="marca" onChange={e => onSubmit({ marca: e.target.value })} />
            </div>
        )}

        <button onClick={onClose} data-testid="close-button">Close</button>
        <button onClick={() => onSubmit(inputsConfig)} data-testid="submit-button">Submit</button>
    </div>
);


jest.mock("../../../components/organisms/CreateModal", () => MockCreateModal);


const mockMarcas = [
    { id: 1, nombre: 'Marca A' },
    { id: 2, nombre: 'Marca B' }
];

const mockPerfume = {
    id: 99,
    nombre: 'Perfume Test',
    descripcion: 'Desc',
    precio: 150.50,
    stock: 10,
    url: 'test.png',
    marca: { id: 1, nombre: 'Marca A' }
};


describe('CrearEditarPerfume Componente', () => {
    
    
    const mockOnClose = jest.fn();
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockGetAllMarcas.mockResolvedValue(mockMarcas);
    });

    
    it('debe cargar las marcas al abrirse el modal', async () => {
        render(
            <CrearEditarPerfume 
                isOpen={true} 
                onClose={mockOnClose} 
                onSubmit={mockOnSubmit} 
            />
        );

        
        expect(mockGetAllMarcas).toHaveBeenCalledTimes(1);

        
        await waitFor(() => {
            expect(screen.getByTestId('input-marca-options-count')).toHaveTextContent('3'); 
        });
    });

    
    it('debe renderizar en modo "Crear Perfume" y mostrar estado de carga de marcas', async () => {
        
        mockGetAllMarcas.mockReturnValue(new Promise(() => {})); 
        
        render(
            <CrearEditarPerfume 
                isOpen={true} 
                onClose={mockOnClose} 
                onSubmit={mockOnSubmit} 
            />
        );
        
        
        expect(screen.getByTestId('modal-title')).toHaveTextContent('Crear Perfume');
        
        
        await waitFor(() => {
            expect(screen.getByTestId('modal-loading')).toHaveTextContent('true');
        });
    });

    
    it('debe renderizar en modo "Editar Perfume" y cargar datos iniciales', async () => {
        
        render(
            <CrearEditarPerfume 
                isOpen={true} 
                onClose={mockOnClose} 
                onSubmit={mockOnSubmit} 
                initialData={mockPerfume} 
            />
        );

        
        await waitFor(() => {
            expect(screen.getByTestId('modal-title')).toHaveTextContent('Editar Perfume');
            expect(screen.getByTestId('input-nombre-value')).toHaveTextContent(mockPerfume.nombre);
            expect(screen.getByTestId('input-marca-value')).toHaveTextContent(mockPerfume.marca.id.toString());
            expect(screen.getByTestId('modal-submit-text')).toHaveTextContent('Actualizar');
        });
    });

    
    it('debe formatear los datos (precio, stock, marca) antes de llamar a onSubmit', async () => {
        
        mockGetAllMarcas.mockResolvedValue(mockMarcas);
        
        const testFormData = {
            nombre: 'Nuevo',
            precio: '100.99', 
            stock: '5', 
            marca: '2', 
        };

        render(
            <CrearEditarPerfume 
                isOpen={true} 
                onClose={mockOnClose} 
                onSubmit={mockOnSubmit} 
                initialData={null} 
            />
        );
        
        
        const instance = screen.getByTestId('input-config');
        
        
        fireEvent.change(instance.querySelector('input[name="nombre"]'), { target: { value: testFormData.nombre } });
        fireEvent.change(instance.querySelector('input[name="precio"]'), { target: { value: testFormData.precio } });
        fireEvent.change(instance.querySelector('input[name="stock"]'), { target: { value: testFormData.stock } });
        fireEvent.change(instance.querySelector('select[name="marca"]'), { target: { value: testFormData.marca } });
        
        
        const submitFn = mockOnSubmit.mock.calls[0][0];
        
        submitFn(testFormData); 

        
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            nombre: 'Nuevo',
            precio: 100.99,
            stock: 5,
            marca: { id: 2 },
        });
    });
});