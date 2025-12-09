import React, { useState } from "react";
import Forms from "../../components/templates/Forms";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../service/UsuarioService";
import { generarMensaje } from "../../utils/GenerarMensaje";
import { useAuth } from "../../context/AuthContext"; // Importamos contexto
import loginData from "./data/loginData"; // Reutilizamos o crea uno propio si tienes createUserData

const CreateUser = () => {
    // Ajusta el estado inicial según los campos que pidas en el registro (nombre, correo, contra, etc.)
    const [form, setForm] = useState({ nombre: "", correo: "", contra: "", telefono: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Usamos la función del contexto

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones básicas
        if (!form.nombre || !form.correo || !form.contra) {
            generarMensaje('Completa los campos obligatorios', 'warning');
            return;
        }

        setLoading(true);
        try {
            // 1. Llamada al servicio de registro (que ahora usa api.js)
            // Tu backend en AuthController.register devuelve { token: "..." }
            const response = await UsuarioService.register(form);

            // 2. Si el backend devolvió el token, iniciamos sesión directo
            if (response && response.token) {
                localStorage.setItem('token', response.token);
                
                // Construimos el objeto usuario para el contexto
                // Nota: A veces el endpoint de registro no devuelve el usuario completo, solo el token.
                // Si es así, podrías decodificar el token o hacer un fetch rápido de datos.
                // Asumiremos por ahora que guardamos lo básico que tenemos en el form.
                const userToSave = { 
                    nombre: form.nombre, 
                    email: form.correo, 
                    rol: { id: 3, nombre: "USER" } // Rol por defecto (ajusta según tu lógica)
                };
                
                login(userToSave);
                generarMensaje('¡Cuenta creada con éxito!', 'success');
                navigate('/'); // Redirigir al home
            } else {
                // Si no devolvió token, lo mandamos al login
                generarMensaje('Cuenta creada. Por favor inicia sesión.', 'success');
                navigate('/login');
            }

        } catch (error) {
            console.error(error);
            generarMensaje('Hubo un error al registrar el usuario.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Reutilizamos la estructura de inputs de loginData pero podrías necesitar adaptarla
    // para incluir 'nombre', 'telefono', etc. Lo dejo genérico para el ejemplo.
    // Lo ideal es tener un archivo data/registerData.js con los campos correctos.
    const inputsConfig = [
        { 
            type: "inputs", 
            inputs: [
                { label: "Nombre", name: "nombre", type: "text", placeholder: "Tu nombre" },
                { label: "Correo", name: "correo", type: "email", placeholder: "correo@ejemplo.com" },
                { label: "Contraseña", name: "contra", type: "password", placeholder: "****" },
                { label: "Teléfono", name: "telefono", type: "text", placeholder: "+569..." },
            ] 
        },
        { 
            type: "button", 
            text: loading ? "Registrando..." : "Crear Cuenta", 
            onClick: handleSubmit,
            disabled: loading 
        }
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
        return { ...item, key: index };
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-theme-main p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-theme-card border border-theme-border p-10 shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-theme-text-main">Registro</h2>
                <Forms content={formDataWithHandlers} />
            </form>
        </main>
    );
};

export default CreateUser;