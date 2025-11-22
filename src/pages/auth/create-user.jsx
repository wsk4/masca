// import React, { useState } from "react";
// import Forms from "../../components/templates/Forms";
// import { generarMensaje } from "../../utils/GenerarMensaje";
// import UsuarioService from "../../service/UsuarioService";
// import { useNavigate } from "react-router-dom";

// const CreateUser = () => {
//   const [form, setForm] = useState({ nombre: "", correo: "", contrasena: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.nombre || !form.correo || !form.contrasena) {
//       generarMensaje('Completa todos los campos', 'warning');
//       return;
//     }
//     setLoading(true);
//     try {
//       await UsuarioService.createUser(form);
//       generarMensaje('Usuario creado correctamente', 'success');
//       setTimeout(() => navigate('/login'), 1000);
//     } catch (error) {
//       generarMensaje('Error al crear usuario', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formConfig = [
//     {
//       type: "inputs",
//       inputs: [
//         { type: "text", placeholder: "Nombre", name: "nombre", value: form.nombre, onChange: handleChange, required: true },
//         { type: "email", placeholder: "Correo Electrónico", name: "correo", value: form.correo, onChange: handleChange, required: true },
//         { type: "password", placeholder: "Contraseña", name: "contrasena", value: form.contrasena, onChange: handleChange, required: true },
//       ]
//     },
//     { type: "button", text: "Crear usuario", onClick: handleSubmit, disabled: loading }
//   ];

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-orange-800 p-4">
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-white/10 p-10 backdrop-blur-xl shadow-2xl">
//         <Forms content={formConfig} />
//       </form>
//     </main>
//   );
// };

// export default CreateUser;
//----------------------------
import React, { useState } from "react";
import Forms from "../../components/templates/Forms";
// ... (imports) ...

const CreateUser = () => {
  // ... (lógica de estado y handlers) ...

  const formConfig = [
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
        { type: "text", placeholder: "Nombre completo", name: "nombre", value: form.nombre, onChange: handleChange, required: true },
        { type: "email", placeholder: "Correo electrónico", name: "correo", value: form.correo, onChange: handleChange, required: true },
        { type: "password", placeholder: "Contraseña", name: "contrasena", value: form.contrasena, onChange: handleChange, required: true },
      ],
      className: "space-y-4"
    },
    { 
        type: "button", 
        text: loading ? "Creando..." : "Crear usuario", 
        onClick: handleSubmit, 
        disabled: loading,
        // Clases de botón blanco/negro de alto contraste
        className: "w-full mt-6 bg-theme-accent text-black hover:bg-theme-hover font-bold"
    },
    {
        type: "text",
        text: [
            {
                content: (
                    <button
                        type="button"
                        onClick={() => navigate('/login')} 
                        className="text-theme-muted hover:text-white underline transition w-full text-center block text-sm mt-4"
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </button>
                ),
                variant: "div",
                className: "text-center",
            },
        ],
    },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-theme-main p-4">
      {/* Fondo de tarjeta oscuro */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-theme-card border border-theme-border p-10 shadow-2xl">
        <Forms content={formConfig} />
      </form>
    </main>
  );
};

export default CreateUser;
