// import React from "react";
// import Section from "../../components/templates/Section";

// const dashboardContent = [
//     {
//         type: "text",
//         text: [{ content: "Panel de Administrador", variant: "h1", className: "text-3xl text-center font-bold mb-8 text-blue-900" }]
//     },
//     {
//         type: "cards",
//         cards: [
//             { title: "Usuarios", description: "Administrar usuarios", href: "/admin/usuarios" },
//             { title: "Perfumes", description: "Administrar productos", href: "/admin/perfumes" },
//             { title: "Marcas", description: "Administrar marcas", href: "/admin/marcas" },
//             { title: "Ventas", description: "Ver ventas", href: "/admin/ventas" }
//         ]
//     }
// ];

// function HomeAdmin() {
//     return (
//         <main className="max-w-3xl mx-auto p-8">
//             <Section content={dashboardContent} />
//         </main>
//     );
// }
// export default HomeAdmin;
//---------------------------
import React from "react";
import Section from "../../components/templates/Section";

const dashboardContent = [
    {
        type: "text",
        text: [
            { content: "PANEL DE ADMINISTRADOR", variant: "h1", className: "text-3xl md:text-4xl text-center font-black tracking-widest mb-2 text-white mt-8" },
            { content: "Gestión General del Sistema", variant: "p", className: "text-center text-theme-muted mb-12" }
        ]
    },
    {
        type: "cards",
        cards: [
            // Nota: Aquí faltan los campos 'card' para que CardsDisplay funcione con tu diseño, 
            // pero el contenedor general mantendrá el fondo oscuro.
            // Si quieres que parezcan links, usa tu componente Section/CardsDisplay para renderizar:
            { title: "Usuarios", description: "Administrar usuarios", href: "/admin/usuarios" },
            { title: "Perfumes", description: "Administrar productos", href: "/admin/perfumes" },
            { title: "Marcas", description: "Administrar marcas", href: "/admin/marcas" },
            { title: "Ventas", description: "Ver ventas", href: "/admin/ventas" }
        ]
    }
];

function HomeAdmin() {
    return (
        <main className="min-h-screen bg-theme-main p-8">
            <div className="max-w-6xl mx-auto">
                {/* Asegura que el contenido se renderice con el estilo oscuro */}
                <Section content={dashboardContent} />
            </div>
        </main>
    );
}
export default HomeAdmin;

