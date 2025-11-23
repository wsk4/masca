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
            // ESTRUCTURA CORREGIDA para que CardsDisplay pueda mapear los elementos:
            {
                card: [
                    { type: "text", content: "Usuarios", variant: "h3", className: "text-2xl font-bold text-white" },
                    { type: "text", content: "Administrar usuarios", variant: "p", className: "text-theme-muted" },
                    { type: "text", content: "Ir →", variant: "p", className: "text-blue-400 mt-2" }
                ]
            },
            {
                card: [
                    { type: "text", content: "Perfumes", variant: "h3", className: "text-2xl font-bold text-white" },
                    { type: "text", content: "Administrar productos", variant: "p", className: "text-theme-muted" },
                    { type: "text", content: "Ir →", variant: "p", className: "text-blue-400 mt-2" }
                ]
            },
            {
                card: [
                    { type: "text", content: "Marcas", variant: "h3", className: "text-2xl font-bold text-white" },
                    { type: "text", content: "Administrar marcas", variant: "p", className: "text-theme-muted" },
                    { type: "text", content: "Ir →", variant: "p", className: "text-blue-400 mt-2" }
                ]
            },
            {
                card: [
                    { type: "text", content: "Ventas", variant: "h3", className: "text-2xl font-bold text-white" },
                    { type: "text", content: "Ver ventas", variant: "p", className: "text-theme-muted" },
                    { type: "text", content: "Ir →", variant: "p", className: "text-blue-400 mt-2" }
                ]
            }
        ]
    }
];

function HomeAdmin() {
    return (
        <main className="min-h-screen bg-theme-main p-8">
            <div className="max-w-6xl mx-auto">
                <Section content={dashboardContent} />
            </div>
        </main>
    );
}
export default HomeAdmin;