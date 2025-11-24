import React, { useState } from "react";
import Forms from "../../components/templates/Forms";
import { generarMensaje } from "../../utils/GenerarMensaje";

function Contacto() {
    const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nombre || !form.correo || !form.mensaje) {
            generarMensaje("Completa todos los campos", "warning");
            return;
        }
        generarMensaje("Mensaje enviado!", "success");
        setForm({ nombre: "", correo: "", mensaje: "" });
    };

    const formConfig = [
        {
            type: "text",
            text: [
                {
                    content: "Contáctanos",
                    variant: "h1",
                    className: "text-center text-4xl font-bold mb-8 text-white tracking-wider"
                }
            ]
        },
        {
            type: "inputs",
            inputs: [
                { type: "text", placeholder: "Nombre", name: "nombre", value: form.nombre, onChange: handleChange, required: true },
                { type: "email", placeholder: "Correo", name: "correo", value: form.correo, onChange: handleChange, required: true },
                { type: "textarea", placeholder: "Mensaje", name: "mensaje", value: form.mensaje, onChange: handleChange, required: true }
            ],
            className: "space-y-4"
        },
        { 
            type: "button", 
            text: "Enviar mensaje", 
            onClick: handleSubmit,
            
            className: "w-full mt-6 bg-white text-black font-bold rounded-lg py-3 hover:bg-theme-hover appearance-none border-none"
        }
    ];

    return (
        
        <main className="max-w-lg mx-auto p-8 min-h-screen flex items-center justify-center">
            <div className="w-full bg-theme-card border border-theme-border rounded-2xl p-10 shadow-2xl">
                <Forms content={formConfig} />
            </div>
        </main>
    );
}
export default Contacto;