import React from "react";
import Section from "../../components/templates/Section";

const dashboardContent = [
    {
        type: "text",
        text: [{ content: "Panel de Administrador", variant: "h1", className: "text-3xl text-center font-bold mb-8 text-blue-900" }]
    },
    {
        type: "cards",
        cards: [
            { title: "Usuarios", description: "Administrar usuarios", href: "/admin/usuarios" },
            { title: "Perfumes", description: "Administrar productos", href: "/admin/perfumes" },
            { title: "Marcas", description: "Administrar marcas", href: "/admin/marcas" },
            { title: "Ventas", description: "Ver ventas", href: "/admin/ventas" }
        ]
    }
];

function HomeAdmin() {
    return (
        <main className="max-w-3xl mx-auto p-8">
            <Section content={dashboardContent} />
        </main>
    );
}
export default HomeAdmin;
