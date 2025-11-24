import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DireccionService from "../../service/DireccionService";
import UsuarioService from "../../service/UsuarioService";
import RegionService from "../../service/RegionService";
import ComunaService from "../../service/ComunaService";
import Button from "../../components/atoms/Button";
import CreateModal from "../../components/organisms/CreateModal";
import { generarMensaje } from "../../utils/GenerarMensaje";
import { FaMapMarkerAlt, FaExchangeAlt, FaCheckCircle, FaEdit } from "react-icons/fa";

function AdderssBook() {
    const { user, login } = useAuth();
    
    // Estados
    const [miDireccion, setMiDireccion] = useState(null);
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    
    // Estados de UI
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // 'create' | 'edit'
    const [currentData, setCurrentData] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            cargarDatos();
        }
    }, [user]);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            // 1. Cargamos auxiliares y el usuario actualizado
            const [regionesRes, comunasRes, userRes] = await Promise.all([
                RegionService.getAll(),
                ComunaService.getAll(),
                user?.id ? UsuarioService.getById(user.id) : Promise.resolve(null)
            ]);

            setRegiones(regionesRes || []);
            setComunas(comunasRes || []);
            
            // 2. SOLUCIÓN: En lugar de buscar en todas las direcciones, 
            // solo mostramos la que el usuario tiene asignada actualmente en su perfil.
            if (userRes && userRes.direccion) {
                setMiDireccion(userRes.direccion);
            } else {
                setMiDireccion(null);
            }

        } catch (error) {
            console.error("Error cargando datos:", error);
            generarMensaje("Error al cargar tu dirección", "error");
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setModalMode("create");
        setCurrentData({ calle: "", numero: "", region: "", comuna: "" });
        setModalOpen(true);
    };

    const openEditModal = () => {
        if (!miDireccion) return;
        setModalMode("edit");
        setCurrentData({
            id: miDireccion.id,
            calle: miDireccion.calle,
            numero: miDireccion.numero,
            region: miDireccion.comuna?.region?.id || "", 
            comuna: miDireccion.comuna?.id || ""
        });
        setModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
        setSaving(true);
        try {
            // 3. CORRECCIÓN ERROR 500:
            // No enviamos el campo 'usuario' porque el backend no lo tiene mapeado.
            const payloadDireccion = {
                calle: formData.calle,
                numero: formData.numero,
                comuna: { id: parseInt(formData.comuna) }
            };

            if (modalMode === "create") {
                // PASO A: Crear la dirección "huérfana" en el backend
                const nuevaDireccion = await DireccionService.create(payloadDireccion);
                
                // PASO B: Asignarla inmediatamente al usuario (Vincular)
                const payloadUsuario = {
                    id: user.id,
                    direccion: { id: nuevaDireccion.id }
                };
                const usuarioActualizado = await UsuarioService.patch(user.id, payloadUsuario);

                // Actualizar estado y contexto
                setMiDireccion(usuarioActualizado.direccion);
                login({ ...user, ...usuarioActualizado });
                generarMensaje("Nueva dirección asignada correctamente", "success");

            } else {
                // Editar la dirección existente
                const dirActualizada = await DireccionService.update(miDireccion.id, payloadDireccion);
                
                // Como es la misma ID, solo actualizamos los datos visuales
                // (Nota: Si el backend devuelve la comuna completa, genial. Si no, recargamos)
                setMiDireccion(prev => ({ ...prev, ...dirActualizada }));
                generarMensaje("Dirección actualizada", "success");
                
                // Refrescamos datos completos por seguridad para traer nombres de comunas
                cargarDatos();
            }
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            generarMensaje("Error al guardar la dirección", "error");
        } finally {
            setSaving(false);
        }
    };

    // Mapeo para selectores
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
                    <p>Cargando información...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen p-6 md:p-12 bg-theme-main pt-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-10 text-center md:text-left">
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3 justify-center md:justify-start">
                    <FaMapMarkerAlt className="text-theme-accent" />
                    Mi Dirección de Envío
                </h1>
                <p className="text-theme-muted mt-2">
                    Gestiona la dirección donde recibirás tus productos.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                {miDireccion ? (
                    // VISTA: USUARIO TIENE DIRECCIÓN
                    <div className="bg-theme-card border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)] rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-4 py-1 rounded-bl-xl flex items-center gap-1">
                            <FaCheckCircle /> Activa
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {miDireccion.calle} #{miDireccion.numero}
                                </h2>
                                <p className="text-theme-accent text-lg">
                                    {miDireccion.comuna?.nombre}, {miDireccion.comuna?.region?.nombre}
                                </p>
                            </div>

                            <div className="flex gap-3 w-full md:w-auto">
                                <Button 
                                    text="Editar" 
                                    icon={<FaEdit />}
                                    onClick={openEditModal}
                                    className="flex-1 md:flex-none bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border-blue-600/50"
                                />
                                <Button 
                                    text="Cambiar" 
                                    icon={<FaExchangeAlt />}
                                    onClick={openCreateModal}
                                    className="flex-1 md:flex-none bg-theme-accent text-black hover:bg-white border-none"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    // VISTA: USUARIO NO TIENE DIRECCIÓN
                    <div className="text-center py-20 border-2 border-dashed border-theme-border rounded-2xl bg-theme-card/30">
                        <div className="w-20 h-20 bg-theme-main rounded-full flex items-center justify-center mx-auto mb-4 text-theme-muted">
                            <FaMapMarkerAlt size={30} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No tienes dirección asignada</h3>
                        <p className="text-theme-muted mb-6 max-w-md mx-auto">
                            Agrega una dirección para que podamos enviarte tus productos.
                        </p>
                        <Button 
                            text="Agregar Dirección" 
                            onClick={openCreateModal}
                            className="bg-theme-accent text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform"
                        />
                    </div>
                )}
            </div>

            {/* Modal Reutilizable */}
            <CreateModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleModalSubmit}
                loading={saving}
                title={modalMode === "create" ? "Nueva Dirección" : "Editar Dirección"}
                submitText={modalMode === "create" ? "Guardar y Asignar" : "Actualizar Datos"}
                initialData={currentData}
                inputsConfig={[
                    {
                        name: "region",
                        label: "Región",
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