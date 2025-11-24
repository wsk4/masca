import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DireccionService from "../../service/DireccionService";
import UsuarioService from "../../service/UsuarioService";
import RegionService from "../../service/RegionService";
import ComunaService from "../../service/ComunaService";
import Button from "../../components/atoms/Button";
import CreateModal from "../../components/organisms/CreateModal";
import { generarMensaje } from "../../utils/GenerarMensaje";
import { FaMapMarkerAlt, FaPlus, FaCheckCircle, FaTrash, FaEdit, FaStar } from "react-icons/fa";

function AdderssBook() {
    const { user, login } = useAuth();
    
    // Estados de datos
    const [direcciones, setDirecciones] = useState([]);
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [userDireccionId, setUserDireccionId] = useState(null);

    // Estados de UI
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create"); 
    const [currentData, setCurrentData] = useState(null);
    const [saving, setSaving] = useState(false);

    // Carga inicial de datos
    useEffect(() => {
        if (user) {
            cargarDatos();
        }
    }, [user]);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            const [dirsRes, regionesRes, comunasRes, userRes] = await Promise.all([
                DireccionService.getAll(),
                RegionService.getAll(),
                ComunaService.getAll(),
                user?.id ? UsuarioService.getById(user.id) : Promise.resolve(null)
            ]);

            // Filtrado de seguridad: solo mostramos direcciones del usuario actual
            const misDirecciones = (dirsRes || []).filter(d => d.usuario?.id === user.id);
            setDirecciones(misDirecciones);

            setRegiones(regionesRes || []);
            setComunas(comunasRes || []);
            
            if (userRes && userRes.direccion) {
                setUserDireccionId(userRes.direccion.id);
            }
        } catch (error) {
            console.error("Error cargando datos:", error);
            generarMensaje("Error al cargar la libreta de direcciones", "error");
        } finally {
            setLoading(false);
        }
    };

    // --- MANEJADORES DE ACCIONES ---

    const handleSetPrincipal = async (direccionId) => {
        try {
            const payload = { id: user.id, direccion: { id: direccionId } };
            const updatedUser = await UsuarioService.patch(user.id, payload);
            
            setUserDireccionId(updatedUser.direccion.id);
            login({ ...user, ...updatedUser }); 
            generarMensaje("Dirección principal actualizada", "success");
        } catch (error) {
            console.error(error);
            generarMensaje("No se pudo cambiar la dirección principal", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta dirección?")) return;
        try {
            await DireccionService.delete(id);
            setDirecciones(prev => prev.filter(d => d.id !== id));
            generarMensaje("Dirección eliminada", "success");
            
            if (id === userDireccionId) setUserDireccionId(null);
        } catch (error) {
            console.error(error);
            generarMensaje("No se pudo eliminar (puede estar en uso)", "error");
        }
    };

    const openCreateModal = () => {
        setModalMode("create");
        // Inicializamos sin 'depto'
        setCurrentData({ calle: "", numero: "", region: "", comuna: "" });
        setModalOpen(true);
    };

    const openEditModal = (direccion) => {
        setModalMode("edit");
        setCurrentData({
            id: direccion.id,
            calle: direccion.calle,
            numero: direccion.numero,
            // Eliminado depto
            region: direccion.comuna?.region?.id || "", 
            comuna: direccion.comuna?.id || ""
        });
        setModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
        setSaving(true);
        try {
            const payload = {
                calle: formData.calle,
                numero: formData.numero,
                // Eliminado depto del payload
                comuna: { id: parseInt(formData.comuna) },
                usuario: { id: user.id } // Vinculación de seguridad
            };

            let res;
            if (modalMode === "create") {
                res = await DireccionService.create(payload);
                setDirecciones([...direcciones, res]);
                generarMensaje("Dirección creada exitosamente", "success");
            } else {
                res = await DireccionService.update(currentData.id, payload);
                setDirecciones(direcciones.map(d => d.id === currentData.id ? res : d));
                generarMensaje("Dirección actualizada", "success");
            }
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            generarMensaje("Error al guardar la dirección", "error");
        } finally {
            setSaving(false);
        }
    };

    const regionOptions = regiones.map(r => ({ value: r.id, label: r.nombre }));
    const comunaOptions = comunas.map(c => ({ 
        value: c.id, 
        label: `${c.nombre} (${c.region?.nombre || 'Sin Región'})` 
    }));

    if (loading) {
        return (
            <div className="min-h-screen bg-theme-main flex items-center justify-center text-white">
                <div className="animate-pulse flex flex-col items-center">
                    <FaMapMarkerAlt size={40} className="mb-4 text-theme-accent"/>
                    <p>Cargando direcciones...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen p-6 md:p-12 bg-theme-main pt-20">
            {/* Header */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <FaMapMarkerAlt className="text-theme-accent" />
                        Libreta de Direcciones
                    </h1>
                    <p className="text-theme-muted mt-2">Gestiona tus lugares de entrega.</p>
                </div>
                <Button 
                    text="Nueva Dirección" 
                    icon={<FaPlus />} 
                    onClick={openCreateModal}
                    className="bg-theme-accent hover:bg-theme-accent/80 text-black font-bold px-6 py-3 rounded-xl shadow-lg shadow-theme-accent/20 transition-all active:scale-95"
                />
            </div>

            {/* Grid de Direcciones */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {direcciones.map((dir) => {
                    const isPrincipal = dir.id === userDireccionId;

                    return (
                        <div 
                            key={dir.id} 
                            className={`
                                relative p-6 rounded-2xl border transition-all duration-300 group
                                ${isPrincipal 
                                    ? "bg-theme-card border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]" 
                                    : "bg-theme-card border-theme-border hover:border-theme-muted hover:shadow-xl"
                                }
                            `}
                        >
                            {/* Badge Principal */}
                            {isPrincipal && (
                                <div className="absolute -top-3 -right-3 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                    <FaCheckCircle /> Principal
                                </div>
                            )}

                            {/* Contenido */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {dir.calle} #{dir.numero}
                                </h3>
                                <div className="mt-4 pt-4 border-t border-theme-border flex flex-col gap-1">
                                    <span className="text-theme-accent font-medium text-sm">
                                        {dir.comuna?.nombre || "Sin Comuna"}
                                    </span>
                                    <span className="text-theme-muted text-xs uppercase tracking-wider">
                                        {dir.comuna?.region?.nombre || "Región desconocida"}
                                    </span>
                                </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex items-center gap-2 mt-auto">
                                {!isPrincipal && (
                                    <button 
                                        onClick={() => handleSetPrincipal(dir.id)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/10"
                                        title="Establecer como principal"
                                    >
                                        <FaStar className="text-yellow-400" /> Usar
                                    </button>
                                )}
                                <button 
                                    onClick={() => openEditModal(dir)}
                                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                    title="Editar"
                                >
                                    <FaEdit />
                                </button>
                                <button 
                                    onClick={() => handleDelete(dir.id)}
                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Eliminar"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* Card Vacía */}
                {direcciones.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-theme-border rounded-2xl bg-theme-card/30 text-theme-muted">
                        <FaMapMarkerAlt size={40} className="mx-auto mb-4 opacity-50" />
                        <p>No tienes direcciones guardadas.</p>
                        <button onClick={openCreateModal} className="text-theme-accent hover:underline mt-2">
                            Agrega la primera aquí
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            <CreateModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                loading={saving}
                title={modalMode === "create" ? "Nueva Dirección" : "Editar Dirección"}
                submitText={modalMode === "create" ? "Guardar Dirección" : "Actualizar"}
                initialData={currentData}
                inputsConfig={[
                    {
                        name: "region",
                        label: "Región (Filtro Visual)",
                        type: "select",
                        options: regionOptions,
                        placeholder: "Selecciona Región...",
                        value: currentData?.region,
                    },
                    {
                        name: "comuna",
                        label: "Comuna",
                        type: "select",
                        options: comunaOptions,
                        placeholder: "Selecciona tu Comuna...",
                        required: true,
                        value: currentData?.comuna
                    },
                    {
                        name: "calle",
                        label: "Calle / Avenida",
                        placeholder: "Ej: Av. Providencia",
                        required: true,
                        value: currentData?.calle
                    },
                    {
                        name: "numero",
                        label: "Numeración",
                        placeholder: "Ej: 1234",
                        required: true,
                        value: currentData?.numero
                    }
                ]}
            />
        </main>
    );
}

export default AdderssBook;