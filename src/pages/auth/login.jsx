import React, { useState } from "react";
import Forms from "../../components/templates/Forms";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../service/UsuarioService";
import { generarMensaje } from "../../utils/GenerarMensaje";
import { useAuth } from "../../context/AuthContext";
import loginData from "./data/loginData";

const Login = () => {
    const [form, setForm] = useState({ correo: "", contra: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.correo || !form.contra) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }
        setLoading(true);
        try {
            const response = await UsuarioService.login(form);
            const usuario = response; 
            
            // 1. Guardar usuario en Contexto y localStorage
            const userToSave = { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol };
            localStorage.setItem('user', JSON.stringify(userToSave));
            login(userToSave);
            
            generarMensaje(`¡Bienvenido ${usuario.nombre}!`, 'success');
            
            if (usuario.rol?.id === 1 || usuario.rol?.id === 2) {
                navigate('/admin'); 
            } else {
                navigate('/'); 
            }
            
        } catch (error) {
            console.error(error);
            generarMensaje('Credenciales inválidas o error de servidor', 'error');
        } finally {
            setLoading(false);
            setForm({ correo: "", contra: "" }); 
        }
    };

    const formDataWithHandlers = loginData.map((item, index) => {
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
        if (item.type === "button") {
            return {
                ...item,
                key: index,
                onClick: handleSubmit,
                disabled: loading,
                text: loading ? "Iniciando..." : item.text,
            };
        }
        return { ...item, key: index };
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-theme-main p-4">
            {}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-theme-card border border-theme-border p-10 shadow-2xl">
                <Forms content={formDataWithHandlers} />
            </form>
        </main>
    );
};

export default Login;