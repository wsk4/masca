// En lugar de ser una única configuración fija, la convertiremos en una colección.

export const adminConfigs = {
    // ----------------------------------------------------
    // CONFIGURACIÓN PARA PERFUMES (Usada por HomePerfume.jsx)
    // ----------------------------------------------------
    perfumes: [
        {
            type: "text",
            text: [
                { id: 1, content: "Gestión de Inventario de Perfumes", variant: "h1", className: "text-4xl font-bold text-center" },
                { id: 2, content: "Aquí puedes editar, crear o eliminar el stock de perfumes de la tienda.", variant: "p", className: "text-lg text-gray-600 text-center mt-2" },
            ],
        },
        {
            type: "table",
            title: "Perfumes en Stock",
            // Columnas adaptadas para mostrar la información del perfume
            columns: ["ID", "Nombre", "Descripción", "Precio", "Stock", "Logo", "Acciones"], 
            data: [], 
            service: "perfumes", // El servicio que busca HomePerfume.jsx
            className: "my-8",
        },
    ],
    
    // ----------------------------------------------------
    // CONFIGURACIÓN PARA MARCAS (Ejemplo, si creas AdminMarcas.jsx)
    // ----------------------------------------------------
    marcas: [
        {
            type: "text",
            text: [
                { id: 1, content: "Gestión de Marcas (Antiguas Facciones)", variant: "h1", className: "text-4xl font-bold text-center" },
                { id: 2, content: "Controla las marcas de los perfumes.", variant: "p", className: "text-lg text-gray-600 text-center mt-2" },
            ],
        },
        {
            type: "table",
            title: "Marcas Activas",
            columns: ["ID", "Nombre", "Descripción", "Logo", "Acciones"],
            data: [],
            service: "marcas",
            className: "my-8",
        },
    ],

    // ----------------------------------------------------
    // CONFIGURACIÓN PARA REGIONES (Usada por AdminUbicaciones.jsx)
    // ----------------------------------------------------
    regiones: [
        {
            type: "text",
            text: [
                { id: 1, content: "Gestión de Zonas de Envío", variant: "h1", className: "text-4xl font-bold text-center" },
                { id: 2, content: "Administra las regiones y comunas disponibles para el despacho.", variant: "p", className: "text-lg text-gray-600 text-center mt-2" },
            ],
        },
        {
            type: "table",
            title: "Regiones Disponibles",
            columns: ["ID", "Nombre", "Código", "Acciones"],
            data: [],
            service: "regiones",
            className: "my-8",
        },
    ],
};

// Exportamos un objeto vacío o genérico para no romper el import por defecto
export default {};