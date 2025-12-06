import React from 'react';

const DynamicTable = ({ columns, data }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left text-gray-300">
                {/* ENCABEZADO: Fondo oscuro (gray-900) y texto blanco brillante */}
                <thead className="text-xs text-white uppercase bg-gray-900 border-b border-gray-700">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} scope="col" className="px-6 py-3 font-bold tracking-wider">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* CUERPO: Fondo transparente o muy oscuro para coincidir con tu app */}
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr 
                                key={rowIndex} 
                                // Fondo base negro/gris oscuro, hover un poco más claro
                                className="bg-transparent border-b border-gray-800 hover:bg-gray-800 transition-colors duration-150"
                            >
                                {row.map((cell, cellIndex) => (
                                    // 'text-white' asegura que los datos se vean bien sobre el fondo negro
                                    <td key={cellIndex} className="px-6 py-4 text-white align-middle">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-400 italic">
                                No se encontraron usuarios registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;