import React, { useState } from "react";
import Forms from "../../components/templates/Forms";
import { generarMensaje } from "../../utils/GenerarMensaje";
import UsuarioService from "../../service/UsuarioService";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [form, setForm] = useState({ nombre: "", correo: "", contrasena: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.contrasena) {
      generarMensaje('Completa todos los campos', 'warning');
      return;
    }
    setLoading(true);
    try {
      await UsuarioService.createUser(form);
      generarMensaje('Usuario creado correctamente', 'success');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      generarMensaje('Error al crear usuario', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formConfig = [
    {
      type: "inputs",
      inputs: [
        { type: "text", placeholder: "Nombre", name: "nombre", value: form.nombre, onChange: handleChange, required: true },
        { type: "email", placeholder: "Correo Electrónico", name: "correo", value: form.correo, onChange: handleChange, required: true },
        { type: "password", placeholder: "Contraseña", name: "contrasena", value: form.contrasena, onChange: handleChange, required: true },
      ]
    },
    { type: "button", text: "Crear usuario", onClick: handleSubmit, disabled: loading }
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-orange-800 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-white/10 p-10 backdrop-blur-xl shadow-2xl">
        <Forms content={formConfig} />
      </form>
    </main>
  );
};

export default CreateUser;
