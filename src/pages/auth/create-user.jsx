import React, { useState } from "react";
import Forms from "../../components/templates/Forms";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../service/UsuarioService";
import { generarMensaje } from "../../utils/GenerarMensaje";
import { useAuth } from "../../context/AuthContext"; 
// import loginData from "./data/loginData"; // Ya no se necesita si usamos el config interno

const CreateUser = () => {
    // Ajusta el estado inicial según los campos que pidas en el registro (nombre, correo, contra, etc.)
    const [form, setForm] = useState({ nombre: "", correo: "", contra: "", telefono: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Usamos la función del contexto

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.value || e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones básicas
        if (!form.nombre || !form.correo || !form.contra) {
            generarMensaje('Completa los campos obligatorios', 'warning');
            return;
        }

        setLoading(true);
        try {
            // Se asume que UsuarioService.createUser está implementado y llama a tu API
            // Si tu backend espera 'contra' en lugar de 'password', está bien como está.
            const response = await UsuarioService.createUser(form); 

            // Nota: En un flujo de registro común, después de crear el usuario,
            // se le pide iniciar sesión o se le loguea automáticamente.
            generarMensaje('Cuenta creada. Por favor inicia sesión.', 'success');
            navigate('/login');

        } catch (error) {
            console.error(error);
            generarMensaje('Hubo un error al registrar el usuario. El correo ya podría estar registrado.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Nueva y mejorada configuración visual del formulario
    const inputsConfig = [
        {
            type: "text",
            text: [
                {
                    content: "Crear Cuenta",
                    variant: "h1",
                    className: "text-center text-4xl font-bold mb-8 text-white tracking-wider",
                }
            ]
        },
        { 
            type: "inputs", 
            inputs: [
                { 
                    type: "text", 
                    name: "nombre", 
                    placeholder: "Nombre completo",
                    required: true,
                    // Estilos oscuros consistentes
                    className: "w-full border-b-2 border-gray-600 bg-transparent text-white placeholder-gray-500 text-lg duration-300 focus-within:border-white",
                },
                { 
                    type: "email", 
                    name: "correo", 
                    placeholder: "Correo electrónico",
                    required: true,
                    autoComplete: "email",
                    className: "w-full border-b-2 border-gray-600 bg-transparent text-white placeholder-gray-500 text-lg duration-300 focus-within:border-white",
                },
                { 
                    type: "text", 
                    name: "telefono", 
                    placeholder: "Teléfono (Opcional)",
                    className: "w-full border-b-2 border-gray-600 bg-transparent text-white placeholder-gray-500 text-lg duration-300 focus-within:border-white",
                },
                { 
                    type: "password", 
                    name: "contra", 
                    placeholder: "Contraseña",
                    required: true,
                    autoComplete: "new-password",
                    className: "w-full border-b-2 border-gray-600 bg-transparent text-white placeholder-gray-500 text-lg duration-300 focus-within:border-white",
                },
            ],
            className: "space-y-8" // Espaciado entre inputs
        },
        { 
            type: "button", 
            text: loading ? "Registrando..." : "Crear Cuenta", 
            onClick: handleSubmit, // Se asigna aquí, luego se sobreescribe el onClick del form
            disabled: loading,
            // Estilos de botón para tema oscuro: blanco sobre negro
            className: "transform w-full mt-8 mb-4 py-2.5 font-bold bg-white text-black rounded-lg hover:bg-gray-200 active:scale-95 transition-all border-none appearance-none",
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <button
                            type="button"
                            onClick={() => navigate('/login')} // Usamos navigate aquí
                            className="text-gray-500 hover:text-white underline transition block w-full text-center text-sm"
                        >
                            ¿Ya tienes cuenta? Inicia sesión
                        </button>
                    ),
                    variant: "p",
                },
            ],
        },
    ];

    const formDataWithHandlers = inputsConfig.map((item, index) => {
        if (item.type === "inputs") {
            return {
                ...item,
                inputs: item.inputs.map(input => ({
                    ...input,
                    value: form[input.name] || "",
                    onChange: handleChange,
                }))
            };
        }
        // El botón usa el texto de loading y el handler de submit definido arriba
        return { ...item, key: index };
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-theme-main p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-theme-card border border-theme-border p-10 shadow-2xl">
                {/* Eliminamos el h2 estático ya que el título ahora es parte de Forms */}
                <Forms content={formDataWithHandlers} />
            </form>
        </main>
    );
};

export default CreateUser;