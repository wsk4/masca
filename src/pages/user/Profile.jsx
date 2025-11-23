import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UsuarioService from "../../service/UsuarioService";
import DireccionService from "../../service/DireccionService"; // 1. Importar servicio de direcciones
import CreateModal from "../../components/organisms/CreateModal";
import Button from "../../components/atoms/Button";
import { generarMensaje } from "../../utils/GenerarMensaje";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Profile() {
    const { user, login } = useAuth();
    const [datos, setDatos] = useState({});
    const [direcciones, setDirecciones] = useState([]); // 2. Estado para las direcciones
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user?.id) {
            const fetchData = async () => {
                try {
                    // Cargar datos del usuario
                    const userData = await UsuarioService.getById(user.id);
                    setDatos(userData);
                    
                    // 3. Cargar direcciones disponibles para el select
                    const dirs = await DireccionService.getAll();
                    setDirecciones(dirs);
                } catch (err) {
                    console.error("Error al cargar datos:", err);
                    generarMensaje("No se pudieron cargar los datos", "error");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    // 4. Convertir direcciones al formato que necesita el Select
    const direccionOptions = [
        { value: "", label: "Sin dirección principal" },
        ...direcciones.map(d => ({
            value: d.id,
            label: `${d.calle} #${d.numero}, ${d.comuna?.nombre || ''}`
        }))
    ];

    const handleSubmit = async (formData) => {
        setSaving(true);
        try {
            // 5. Construir el payload correctamente
            // El backend espera que 'direccion' sea un objeto { id: X }, no un string.
            const payload = { 
                ...formData, 
                id: user.id,
                direccion: formData.direccion ? { id: parseInt(formData.direccion) } : null
            };

            // Usar .patch para actualizar parcialmente
            const res = await UsuarioService.patch(user.id, payload);
            
            setDatos(res); 
            
            // Actualizar contexto global
            const updatedUserContext = { ...user, ...res };
            login(updatedUserContext); 

            generarMensaje("Perfil actualizado correctamente", "success");
            setOpenModal(false);
        } catch (error) {
            console.error(error);
            generarMensaje("Error al actualizar el perfil", "error");
        } finally {
            setSaving(false);
        }
    };

    if (!user) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-theme-main">
                <div className="text-center p-8 bg-theme-card border border-theme-border rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Acceso Restringido</h2>
                    <p className="text-theme-muted">Por favor inicia sesión para ver tu perfil.</p>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-theme-main text-white">
                <div className="animate-pulse">Cargando perfil...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-4 md:p-8 bg-theme-main flex justify-center items-start pt-12">
            <div className="w-full max-w-3xl bg-theme-card border border-theme-border rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Header del Perfil */}
                <div className="bg-gradient-to-r from-zinc-900 to-black p-8 border-b border-theme-border flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-theme-border flex items-center justify-center text-theme-muted border-4 border-theme-main shadow-xl">
                            <FaUserCircle size={60} />
                        </div>
                        <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-black rounded-full" title="Activo"></span>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-black text-white tracking-tight">{datos.nombre}</h1>
                        <p className="text-theme-accent font-medium uppercase tracking-widest text-sm mt-1">
                            {datos.rol?.nombre || "Cliente"}
                        </p>
                    </div>
                </div>

                {/* Detalles */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Columna 1 */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-theme-main/50 border border-theme-border/50">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-theme-muted uppercase font-bold">Correo Electrónico</p>
                                <p className="text-white font-medium">{datos.correo}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-theme-main/50 border border-theme-border/50">
                            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                <FaIdBadge size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-theme-muted uppercase font-bold">ID de Usuario</p>
                                <p className="text-white font-medium">#{datos.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Columna 2 */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-theme-main/50 border border-theme-border/50">
                            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                <FaPhone size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-theme-muted uppercase font-bold">Teléfono</p>
                                <p className="text-white font-medium">{datos.telefono || "No registrado"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-theme-main/50 border border-theme-border/50">
                            <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-theme-muted uppercase font-bold">Dirección Principal</p>
                                <p className="text-white font-medium">
                                    {datos.direccion 
                                        ? `${datos.direccion.calle} #${datos.direccion.numero}` 
                                        : "Sin dirección principal"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-theme-border bg-theme-main/30 flex justify-end">
                    <Button 
                        text="Editar Información" 
                        onClick={() => setOpenModal(true)}
                        className="bg-white text-black font-bold hover:bg-gray-200 border-none"
                    />
                </div>
            </div>

            {/* Modal con Selector de Dirección */}
            <CreateModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                loading={saving}
                title="Editar Perfil"
                submitText="Guardar Cambios"
                initialData={{
                    nombre: datos.nombre,
                    correo: datos.correo,
                    telefono: datos.telefono,
                    direccion: datos.direccion?.id || "" // Valor inicial para el select
                }}
                inputsConfig={[
                    { 
                        name: "nombre", 
                        placeholder: "Nombre Completo", 
                        value: datos.nombre, 
                        required: true 
                    },
                    { 
                        name: "correo", 
                        placeholder: "Correo Electrónico", 
                        value: datos.correo, 
                        type: "email", 
                        required: true 
                    },
                    { 
                        name: "telefono", 
                        placeholder: "Teléfono", 
                        value: datos.telefono, 
                        type: "tel" 
                    },
                    {
                        name: "direccion",
                        type: "select",
                        placeholder: "Dirección Principal",
                        options: direccionOptions, // Opciones cargadas dinámicamente
                        value: datos.direccion?.id || ""
                    }
                ]}
            />
        </main>
    );
}

export default Profile;