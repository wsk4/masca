import React from 'react';

const DynamicTable = ({ columns, data }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* Cambiamos a colores oscuros: texto gris claro, fondo transparente/oscuro */}
            <table className="w-full text-sm text-left text-gray-300">
                
                {/* Encabezado: Fondo gris oscuro (gray-700) y texto blanco */}
                <thead className="text-xs text-white uppercase bg-gray-700 border-b border-gray-600">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Cuerpo: Fondo gris muy oscuro (gray-800) y bordes tenues */}
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr 
                                key={rowIndex} 
                                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 transition-colors"
                            >
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4">
                                        {/* Renderizado directo para que funcionen tus botones */}
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-400 bg-gray-800">
                                No se encontraron datos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;