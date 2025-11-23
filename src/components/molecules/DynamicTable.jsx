import React from 'react';
import Image from '../atoms/Image';
import Button from '../atoms/Button';

function DynamicTable({
    columns = [],
    data = [],
    className = '',
    striped = true,
    hover = true,
    emptyMessage = 'No hay datos disponibles',
    actions = [] // acciones dinámicas
}) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12 text-theme-muted bg-theme-card rounded-xl border border-theme-border shadow-xl">
                <span className="text-lg">📄 {emptyMessage}</span>
            </div>
        );
    }

    const isArrayFormat = data.length > 0 && Array.isArray(data[0]);
    const isImageUrl = (str) => {
        if (!str || typeof str !== 'string') return false;
        return (
            str.startsWith('http') ||
            str.startsWith('/') ||
            /\.(png|jpg|jpeg|svg|gif|webp)$/i.test(str)
        );
    };

    return (
        <div className={`overflow-x-auto rounded-xl border border-theme-border shadow-xl ${className}`}>
            <table className="w-full min-w-max border-collapse text-left">
                <thead>
                    <tr className="bg-theme-card border-b border-theme-border">
                        {columns.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-theme-muted"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-theme-border bg-theme-main">
                    {data.map((row, rowIndex) => {
                        const cells = isArrayFormat
                            ? row
                            : columns.map((col) => {
                                const key = col.toLowerCase();
                                return row[col] ?? row[key] ?? '';
                            });

                        return (
                            <tr
                                key={row.id || rowIndex}
                                className={`${striped && rowIndex % 2 === 0 ? 'bg-theme-card' : ''
                                    } ${hover ? 'hover:bg-theme-border/50' : ''} transition-colors`}
                            >
                                {cells.map((cell, cellIndex) => {
                                    const header = columns[cellIndex];
                                    const headerLower = header.toLowerCase();

                                    if (headerLower === 'acciones') {
                                        return (
                                            <td key={cellIndex} className="px-6 py-4 text-sm whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    {actions.length > 0
                                                        ? actions.map((action, i) => (
                                                            <Button
                                                                key={i}
                                                                text={action.label}
                                                                onClick={() => action.onClick(row)}
                                                                className={action.className}
                                                            />
                                                        ))
                                                        : (
                                                            <>
                                                                <Button
                                                                    text="Editar"
                                                                    onClick={() => row.onEdit?.(row)}
                                                                    className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1 text-xs"
                                                                />
                                                                <Button
                                                                    text="Eliminar"
                                                                    onClick={() => row.onDelete?.(row.id)}
                                                                    className="bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1 text-xs"
                                                                />
                                                            </>
                                                        )}
                                                </div>
                                            </td>
                                        );
                                    }

                                    const isImageColumn =
                                        headerLower.includes('logo') ||
                                        headerLower.includes('imagen') ||
                                        headerLower.includes('foto') ||
                                        headerLower.includes('avatar');

                                    const shouldShowImage = isImageColumn && isImageUrl(cell);

                                    return (
                                        <td
                                            key={cellIndex}
                                            className={`px-6 py-4 text-sm text-theme-text ${isImageColumn ? 'whitespace-normal' : 'whitespace-nowrap'
                                                }`}
                                        >
                                            {shouldShowImage ? (
                                                <Image
                                                    src={cell}
                                                    alt={header}
                                                    className="h-12 w-12 object-contain rounded-lg shadow-sm bg-white/10"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <span className={shouldShowImage ? 'hidden' : ''}>{cell}</span>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DynamicTable;
