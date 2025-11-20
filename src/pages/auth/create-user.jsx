import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from '../../components/templates/Forms';
import { generarMensaje } from '../../utils/GenerarMensaje';
import UserService from '../../services/UserService';

const CreateUser = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contra: "",
    telefono: "",
    rol: "", // aquí será el id
    direccion: "" // aquí será el id
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [direcciones, setDirecciones] = useState([]);

  const navigate = useNavigate();

  // Cargar roles y direcciones desde API
  useEffect(() => {
    // Ejemplo de llamadas a API para roles y direcciones
    UserService.getRoles().then(response => {
      setRoles(response.data.map(r => ({ id: String(r.id), label: r.nombre })));
    });
    UserService.getDirecciones().then(response => {
      setDirecciones(response.data.map(d => ({ id: String(d.id), label: d.nombre })));
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.contra || !form.rol || !form.direccion) {
      generarMensaje('Completa todos los campos obligatorios', 'warning');
      return;
    }
    setLoading(true);
    try {
      const usuario = {
        nombre: form.nombre,
        correo: form.correo,
        contra: form.contra,
        telefono: form.telefono,
        rol: { id: form.rol },
        direccion: { id: form.direccion }
      };
      await UserService.createUser(usuario);
      generarMensaje('Usuario creado!', 'success');
      // redirect o limpiar formulario
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al crear usuario';
      generarMensaje(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const formConfig = [
    {
      type: "text",
      text: [{ content: "Crear usuario", variant: "h1", className: "text-center text-4xl font-medium mb-10 text-white" }]
    },
    {
      type: "inputs",
      inputs: [
        {
          type: "text",
          placeholder: "Nombre usuario",
          name: "nombre",
          value: form.nombre,
          onChange: handleChange,
          required: true,
          className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mb-4",
        },
        {
          type: "email",
          placeholder: "Correo Electrónico",
          name: "correo",
          value: form.correo,
          onChange: handleChange,
          required: true,
          className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mb-4",
        },
        {
          type: "password",
          placeholder: "Contraseña",
          name: "contra",
          value: form.contra,
          onChange: handleChange,
          required: true,
          className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500",
        },
        {
          type: "text",
          placeholder: "Teléfono",
          name: "telefono",
          value: form.telefono,
          onChange: handleChange,
        },
        {
          type: "select",
          label: "Rol",
          name: "rol",
          value: form.rol,
          options: roles,
          onChange: handleChange,
        },
        {
          type: "select",
          label: "Dirección",
          name: "direccion",
          value: form.direccion,
          options: direcciones,
          onChange: handleChange,
        }
      ],
      className: "space-y-8"
    },
    {
      type: "button",
      text: "Crear usuario",
      className: "transform w-full mt-4 mb-4 rounded-sm bg-indigo-600 py-2 font-bold hover:bg-indigo-400",
      disabled: loading
    },
    {
      type: "text",
      text: [
        {
          content: (
            <Link to="/login" className="text-indigo-400 underline hover:text-indigo-300 transition">
              Ya tengo un usuario
            </Link>
          ),
          variant: "p",
          className: "text-center text-lg"
        }
      ]
    }
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
