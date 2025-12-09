import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DynamicTable from '../../../components/molecules/DynamicTable';

describe('Molecula DynamicTable', () => {

    it('renderiza el mensaje vacío cuando no hay datos', () => {
        render(<DynamicTable columns={['Nombre']} data={[]} emptyMessage="Nada por aquí" />);
        
        expect(screen.getByText(/Nada por aquí/i)).toBeInTheDocument();
        expect(screen.queryByText('Nombre')).not.toBeInTheDocument();
    });

    it('renderiza las columnas y los datos correctamente', () => {
        const columns = ['ID', 'Nombre'];
        const data = [
            { ID: 1, Nombre: 'Producto A' },
            { ID: 2, Nombre: 'Producto B' }
        ];

        render(<DynamicTable columns={columns} data={data} />);

        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(screen.getByText('Producto A')).toBeInTheDocument();
        expect(screen.getByText('Producto B')).toBeInTheDocument();
    });

    it('detecta y renderiza imágenes en columnas específicas', () => {
        const columns = ['Nombre', 'Imagen del Producto'];
        const data = [
            { Nombre: 'Test', 'Imagen del Producto': 'http://sitio.com/foto.png' }
        ];

        render(<DynamicTable columns={columns} data={data} />);

        const img = screen.getByRole('img', { name: /Imagen del Producto/i });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'http://sitio.com/foto.png');
    });

    it('renderiza botones de acción y maneja el click', () => {
        const columns = ['Nombre', 'Acciones'];
        const data = [{ id: 1, Nombre: 'Item 1' }];
        const handleEdit = vi.fn(); // Mock de función
        
        const actionsConfig = [
            { label: 'Editar', onClick: handleEdit, className: 'btn-edit' }
        ];

        render(<DynamicTable columns={columns} data={data} actions={actionsConfig} />);

        const btn = screen.getByText('Editar');
        fireEvent.click(btn);

        expect(handleEdit).toHaveBeenCalled();
        expect(handleEdit).toHaveBeenCalledWith(data[0]);
    });
});