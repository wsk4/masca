import React, { useState } from "react";
import Forms from "../../components/templates/Forms";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../service/UsuarioService";
import { generarMensaje } from "../../utils/GenerarMensaje";
import { useAuth } from "../../context/AuthContext";
import loginData from "./data/loginData"; 

const CreateUser = () => {
    const [form, setForm] = useState({ nombre: "", correo: "", contra: "", telefono: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nombre || !form.correo || !form.contra) {
            generarMensaje('Completa los campos obligatorios', 'warning');
            return;
        }

        setLoading(true);
        try {
            
            const response = await UsuarioService.register(form);

            if (response && response.token) {
                localStorage.setItem('token', response.token);
                
                
                const userToSave = { 
                    nombre: form.nombre, 
                    email: form.correo, 
                    rol: { id: 3, nombre: "USER" } 
                };
                
                login(userToSave);
                generarMensaje('¡Cuenta creada con éxito!', 'success');
                navigate('/'); 
            } else {
                
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