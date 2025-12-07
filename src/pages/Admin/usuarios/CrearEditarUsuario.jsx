import React, { useState, useEffect } from "react";
import Button from "../../../components/atoms/Button"; 
// Ajusta la ruta de importación de Button según tu estructura de carpetas

const CrearEditarUsuario = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    initialData, 
    loading, 
    onDelete 
}) => {
    // Estado inicial del formulario
    const [formData, setFormData] = useState({
        id: null,
        nombre: "",
        correo: "",
        telefono: "",
        password: "", // Campo contraseña
        rol: "",      
        direccion: "" 
    });

    // Cargar datos cuando se edita
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                id: initialData.id,
                nombre: initialData.nombre || "",
                correo: initialData.correo || "",
                telefono: initialData.telefono || "",
                password: "", // No se rellena la password al editar
                rol: initialData.rol?.id || "", 
                direccion: initialData.direccion?.id || ""
            });
        } else {
            // Limpiar si es crear nuevo
            setFormData({
                id: null,
                nombre: "",
                correo: "",
                telefono: "",
                password: "",
                rol: "",
                direccion: ""
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(formData); // Envía los datos al padre (ListarUsuarios)
    };

    if (!isOpen) return null;

    const isEditing = !!formData.id; // Controla si estamos en modo edición

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
            {/* Contenedor del Modal con fondo NEGRO puro y borde blanco/gris */}
            <div className="bg-black border border-gray-600 p-6 rounded-lg w-full max-w-md shadow-2xl relative text-white">
                
                {/* Botón X para cerrar */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-white pl-3">
                    {isEditing ? "Editar usuario" : "Crear usuario"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {/* Input Nombre */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded p-2 text-white focus:border-white focus:outline-none placeholder-gray-600"
                            placeholder="Nombre"
                            required
                        />
                    </div>

                    {/* Input Correo */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Correo</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded p-2 text-white focus:border-white focus:outline-none placeholder-gray-600"
                            placeholder="Correo"
                            required
                        />
                    </div>

                    {/* Input Teléfono */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded p-2 text-white focus:border-white focus:outline-none placeholder-gray-600"
                            placeholder="Teléfono"
                        />
                    </div>

                    {/* Input Contraseña (Solo si es crear o si quieres permitir cambiarla) */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded p-2 text-white focus:border-white focus:outline-none placeholder-gray-600"
                            placeholder="Contraseña"
                            // Requerido solo si estamos creando un usuario nuevo
                            required={!isEditing}
                        />
                    </div>

                    {/* Select Rol (Ejemplo estático, ajusta tus opciones) */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Rol</label>
                        <select
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                            className="w-full bg-black border border-gray-500 rounded p-2 text-white focus:border-white focus:outline-none"
                        >
                            <option value="">Seleccione...</option>
                            <option value="1">Administrador</option>
                            <option value="2">Usuario</option>
                            {/* Agrega aquí tus roles dinámicos si los tienes */}
                        </select>
                    </div>

                    {/* Select Dirección (Ejemplo) */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Dirección</label>
                        <select
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="w-full bg-black border border-gray-500 rounded p-2 text-white focus:border-white focus:outline-none"
                        >
                            <option value="">Seleccione...</option>
                            <option value="1">Casa Central</option>
                            <option value="2">Sucursal Norte</option>
                        </select>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="flex justify-between mt-6">
                        {/* Botón Eliminar (Solo visible en edición) */}
                        {isEditing && (
                            <Button 
                                text="Eliminar"
                                onClick={() => onDelete(formData.id)}
                                type="button"
                                className="bg-transparent border border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
                                disabled={loading}
                            />
                        )}
                        
                        {/* Contenedor de Guardar y Cancelar */}
                        <div className={`flex gap-3 ${!isEditing && 'w-full justify-end'}`}>
                            {/* Botón Cancelar (Borde blanco, fondo transparente) */}
                            <Button 
                                text="Cancelar"
                                onClick={onClose}
                                type="button"
                                className="bg-transparent border border-gray-500 text-white hover:border-white hover:text-white"
                                disabled={loading}
                            />
                            
                            {/* Botón Guardar (Fondo BLANCO, texto NEGRO) */}
                            <Button 
                                text={loading ? "Guardando..." : "Guardar"}
                                type="submit" // CRUCIAL: Esto activa el onSubmit del form
                                disabled={loading}
                                className="bg-white text-black hover:bg-gray-200 border-none"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearEditarUsuario;