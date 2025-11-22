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
            type: "inputs",
            inputs: [
                { type: "text", placeholder: "Nombre", name: "nombre", value: form.nombre, onChange: handleChange, required: true },
                { type: "email", placeholder: "Correo", name: "correo", value: form.correo, onChange: handleChange, required: true },
                { type: "text", placeholder: "Mensaje", name: "mensaje", value: form.mensaje, onChange: handleChange, required: true }
            ]
        },
        { type: "button", text: "Enviar mensaje", onClick: handleSubmit }
    ];

    return (
        <main className="max-w-lg mx-auto p-8">
            <Forms content={formConfig} />
        </main>
    );
}
export default Contacto;
