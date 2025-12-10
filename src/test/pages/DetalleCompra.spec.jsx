import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetalleCompra from '../DetalleCompra';


const mockCompraService = {
    getById: jest.fn(),
};
jest.mock('../../../service/CompraService', () => mockCompraService);



const mockCompraData = {
    id: 99,
    usuario: { nombre: 'Juan Pérez' },
    estadoCompra: { nombre: 'Completada' },
    estadoEnvio: { nombre: 'Entregado' },
    fechaCompra: '2025-10-25',
    detalleCompras: [
        { 
            id: 101, 
            producto: { nombre: 'Perfume A' }, 
            cantidad: 2, 
            precioUnitario: 50.00 
        },
        { 
            id: 102, 
            producto: { nombre: 'Perfume B' }, 
            cantidad: 1, 
            precioUnitario: 120.50 
        },
    ],
    total: 220.50, 
};


describe('DetalleCompra', () => {
    const mockOnClose = jest.fn();
    const testId = 99;

    beforeEach(() => {
        jest.clearAllMocks();
        
        mockCompraService.getById.mockResolvedValue(mockCompraData);
    });

    
    
    it('muestra el mensaje de "Cargando" inicialmente y luego la compra', async () => {
        
        mockCompraService.getById.mockReturnValue(new Promise(() => {}));

        const { rerender } = render(<DetalleCompra id={testId} onClose={mockOnClose} />);
        
        
        expect(screen.getByText('Cargando detalle...')).toBeInTheDocument();
        
        
        mockCompraService.getById.mockResolvedValue(mockCompraData);
        rerender(<DetalleCompra id={testId} onClose={mockOnClose} />);

        
        await waitFor(() => {
            expect(screen.queryByText('Cargando detalle...')).not.toBeInTheDocument();
            expect(screen.getByText(`Compra #${testId}`)).toBeInTheDocument();
        });
    });

    it('llama a CompraService.getById al montar el componente con el ID correcto', () => {
        render(<DetalleCompra id={testId} onClose={mockOnClose} />);
        
        expect(mockCompraService.getById).toHaveBeenCalledWith(testId);
    });

    

    it('muestra correctamente la información del encabezado de la compra', async () => {
        render(<DetalleCompra id={testId} onClose={mockOnClose} />);
        
        await waitFor(() => {
            expect(screen.getByText(`Compra #${testId}`)).toBeInTheDocument();
            expect(screen.getByText(/Usuario: Juan Pérez/i)).toBeInTheDocument();
            expect(screen.getByText(/Estado compra: Completada/i)).toBeInTheDocument();
            expect(screen.getByText(/Estado envío: Entregado/i)).toBeInTheDocument();
            expect(screen.getByText(/Fecha: 2025-10-25/i)).toBeInTheDocument();
        });
    });

    
    
    it('renderiza la tabla de detalles con los cálculos correctos', async () => {
        render(<DetalleCompra id={testId} onClose={mockOnClose} />);
        
        await waitFor(() => {
            
            expect(screen.getByText('Perfume A')).toBeInTheDocument();
            expect(screen.getByText('Perfume B')).toBeInTheDocument();
            
            
            expect(screen.getByRole('cell', { name: /Perfume A/i }).closest('tr')).toHaveTextContent('2');
            expect(screen.getByRole('cell', { name: /Perfume A/i }).closest('tr')).toHaveTextContent('$50.00'); // Precio unitario
            expect(screen.getByRole('cell', { name: /Perfume A/i }).closest('tr')).toHaveTextContent('$100.00'); // Subtotal (2 * 50)
            
         
            expect(screen.getByRole('cell', { name: /Perfume B/i }).closest('tr')).toHaveTextContent('1');
            expect(screen.getByRole('cell', { name: /Perfume B/i }).closest('tr')).toHaveTextContent('$120.50'); // Precio unitario
            expect(screen.getByRole('cell', { name: /Perfume B/i }).closest('tr')).toHaveTextContent('$120.50'); // Subtotal (1 * 120.50)
            
            
            expect(screen.getByText('Total: $220.50')).toBeInTheDocument();
        });
    });
    
    

    it('llama a onClose al clickear el botón de cierre', async () => {
        const user = userEvent.setup();
        render(<DetalleCompra id={testId} onClose={mockOnClose} />);
        
        
        await waitFor(() => expect(screen.getByText(`Compra #${testId}`)).toBeInTheDocument());
        
        
        const closeButton = screen.getByText('×');
        await user.click(closeButton);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});