import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListarCompras from '../ListarCompras';




const mockCompraService = {
    getAll: jest.fn(),
};
jest.mock('../../../service/CompraService', () => mockCompraService);


const mockUseAuth = { user: { id: 10, name: 'Admin' } };
jest.mock('../../../context/AuthContext', () => ({
    useAuth: jest.fn(() => mockUseAuth),
}));


const MockDynamicTable = jest.fn(() => <div data-testid="dynamic-table">Mock Table</div>);
jest.mock('../../../components/molecules/DynamicTable', () => MockDynamicTable);


const MockDetalleCompra = jest.fn(({ id, onClose }) => (
    <div data-testid="detalle-compra-modal">
        Detalle ID: {id}
        <button onClick={onClose} data-testid="detalle-close-button">Cerrar Detalle</button>
    </div>
));
jest.mock('./DetalleCompra', () => MockDetalleCompra);



const mockCompras = [
    { 
        id: 101, 
        usuario: { nombre: 'Alice' }, 
        estadoCompra: { nombre: 'Pendiente' },
        estadoEnvio: { nombre: 'En Proceso' },
        fechaCompra: '2025-10-01'
    },
    { 
        id: 102, 
        usuario: { nombre: 'Bob' }, 
        estadoCompra: { nombre: 'Completada' },
        estadoEnvio: { nombre: 'Entregado' },
        fechaCompra: '2025-10-05'
    },
];


describe('ListarCompras', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockCompraService.getAll.mockResolvedValue(mockCompras);
    });

    

    it('debe llamar a CompraService.getAll y renderizar la DynamicTable con los datos', async () => {
        render(<ListarCompras />);

        
        expect(mockCompraService.getAll).toHaveBeenCalledTimes(1);

        
        await waitFor(() => {
            expect(MockDynamicTable).toHaveBeenCalled();
            const tableProps = MockDynamicTable.mock.calls[0][0];
            
            
            expect(tableProps.columns).toEqual(["ID", "Usuario", "Estado compra", "Estado envío", "Fecha", "Acciones"]);
            
            
            expect(tableProps.data.length).toBe(2);
            
            
            expect(tableProps.data[0][0]).toBe(101); 
            expect(tableProps.data[0][1]).toBe('Alice'); 
            expect(tableProps.data[0][2]).toBe('Pendiente'); 
        });
    });


    

    it('debe abrir el modal DetalleCompra al clickear "Ver detalle"', async () => {
        render(<ListarCompras />);
        await waitFor(() => expect(mockCompraService.getAll).toHaveBeenCalled());

        
        const viewDetailButtons = screen.getAllByRole('button', { name: /Ver detalle/i });
        fireEvent.click(viewDetailButtons[0]);

        
        expect(screen.getByTestId('detalle-compra-modal')).toBeInTheDocument();
        
        
        expect(MockDetalleCompra).toHaveBeenCalledWith(
            expect.objectContaining({ id: 101 }),
            {}
        );
    });
    
    it('debe cerrar el modal DetalleCompra al llamar onClose', async () => {
        render(<ListarCompras />);
        await waitFor(() => expect(mockCompraService.getAll).toHaveBeenCalled());

        
        const viewDetailButtons = screen.getAllByRole('button', { name: /Ver detalle/i });
        fireEvent.click(viewDetailButtons[0]);

        
        expect(screen.getByTestId('detalle-compra-modal')).toBeInTheDocument();

        
        fireEvent.click(screen.getByTestId('detalle-close-button'));

        
        await waitFor(() => {
            expect(screen.queryByTestId('detalle-compra-modal')).not.toBeInTheDocument();
        });
    });
});