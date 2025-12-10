import React, { useState, useEffect } from "react";
import Button from "../../../components/atoms/Button"; 


const CrearEditarUsuario = ({ isOpen, onClose, onSubmit, initialData, loading }) => {
    
    const [formData, setFormData] = useState({
        id: null,
        nombre: "",
        correo: "",
        telefono: "",
        password: "", 
        rol: "",      
        direccion: "" 
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                id: initialData.id,
                nombre: initialData.nombre || "",
                correo: initialData.correo || "",
                telefono: initialData.telefono || "",
                password: "", 
                rol: initialData.rol?.id || "", 
                direccion: initialData.direccion?.id || ""
            });
        } else {
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
        onSubmit(formData); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="bg-black border border-gray-600 p-6 rounded-lg w-full max-w-md shadow-2xl relative text-white">
                
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-white pl-3">
                    {formData.id ? "Editar usuario" : "Crear usuario"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
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

                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded p-2 text-white focus:border-white focus:outline-none placeholder-gray-600"
                            placeholder="Contraseña"
                            required={!formData.id}
                        />
                    </div>

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
                        </select>
                    </div>

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

                    <div className="flex justify-end gap-3 mt-6">
                        <Button 
                            text="Cancelar"
                            onClick={onClose}
                            type="button"
                            className="bg-transparent border border-gray-500 text-white hover:border-white hover:text-white"
                        />
                        
                        <Button 
                            text={loading ? "Guardando..." : "Guardar"}
                            type="submit" 
                            disabled={loading}
                            className="bg-white text-black hover:bg-gray-200 border-none"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearEditarUsuario;