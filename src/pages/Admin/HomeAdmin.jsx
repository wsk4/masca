import React from "react";
import Section from "../../components/templates/Section";
import { useNavigate } from "react-router-dom"; // 1. Importar useNavigate
import Button from "../../components/atoms/Button"; // 2. Importar Button

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
    const navigate = useNavigate(); // 3. Inicializar useNavigate
    
    // Función de navegación simple
    const handleGoToUser = () => {
        navigate('/');
    };

    return (
        <main className="min-h-screen bg-theme-main p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* BOTÓN AÑADIDO: Volver a la vista de usuario */}
                <div className="flex justify-end mb-6">
                    <Button 
                        onClick={handleGoToUser} 
                        text="← Volver a Vista de Usuario"
                        className="bg-transparent border border-theme-muted text-theme-muted hover:bg-theme-card hover:text-white"
                    />
                </div>
                
                <Section content={dashboardContent} />
            </div>
        </main>
    );
}
export default HomeAdmin;