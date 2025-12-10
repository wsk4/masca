import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DynamicTable from '../../../components/molecules/DynamicTable';

describe('Molecula DynamicTable', () => {

    it('renderiza el mensaje vacío cuando no hay datos', () => {
        render(<DynamicTable columns={['Nombre']} data={[]} emptyMessage="Nada por aquí" />);
        
        expect(screen.getByText(/Nada por aquí/i)).toBeTruthy();
        const header = screen.queryByText('Nombre');
        if (header) {
            fail('No debería renderizar cabeceras si está vacío');
        }
    });

    it('renderiza las columnas y los datos correctamente (formato Objeto)', () => {
        const columns = ['ID', 'Nombre'];
        const data = [
            { ID: 1, Nombre: 'Producto A' },
            { ID: 2, Nombre: 'Producto B' }
        ];

        render(<DynamicTable columns={columns} data={data} />);

        expect(screen.getByText('ID')).toBeTruthy();
        expect(screen.getByText('Nombre')).toBeTruthy();

        expect(screen.getByText('Producto A')).toBeTruthy();
        expect(screen.getByText('Producto B')).toBeTruthy();
    });

    it('renderiza correctamente cuando los datos son Arrays simples', () => {
        const columns = ['A', 'B'];
        const data = [
            ['Dato 1', 'Dato 2']
        ];

        render(<DynamicTable columns={columns} data={data} />);

        expect(screen.getByText('Dato 1')).toBeTruthy();
        expect(screen.getByText('Dato 2')).toBeTruthy();
    });

    it('detecta y renderiza imágenes en columnas específicas', () => {
        const columns = ['Nombre', 'Imagen del Producto'];
        const data = [
            { Nombre: 'Test', 'Imagen del Producto': 'http://sitio.com/foto.png' }
        ];

        render(<DynamicTable columns={columns} data={data} />);

        const img = screen.getByAltText('Imagen del Producto');
        
        expect(img).toBeTruthy();
        expect(img.tagName).toBe('IMG');
        expect(img.getAttribute('src')).toBe('http://sitio.com/foto.png');
    });

    it('renderiza botones de acción y maneja el click', () => {
        const columns = ['Nombre', 'Acciones'];
        const data = [{ id: 1, Nombre: 'Item 1' }];
        
        const handleEdit = jasmine.createSpy('handleEdit');
        
        const actionsConfig = [
            { label: 'Editar', onClick: handleEdit, className: 'btn-edit' }
        ];

        render(<DynamicTable columns={columns} data={data} actions={actionsConfig} />);

        const btn = screen.getByText('Editar');
        expect(btn).toBeTruthy();
        
        fireEvent.click(btn);

        expect(handleEdit).toHaveBeenCalled();
        expect(handleEdit).toHaveBeenCalledWith(data[0]);
    });

    it('renderiza botones por defecto (Editar/Eliminar) si hay columna Acciones pero no actions prop', () => {
        const columns = ['Nombre', 'Acciones'];
        const onRowDelete = jasmine.createSpy('onRowDelete');
        const data = [{ id: 99, Nombre: 'Item Borrable', onDelete: onRowDelete }];

        render(<DynamicTable columns={columns} data={data} />); 

        const btnEliminar = screen.getByText('Eliminar');
        fireEvent.click(btnEliminar);

        expect(onRowDelete).toHaveBeenCalledWith(99);
    });
});