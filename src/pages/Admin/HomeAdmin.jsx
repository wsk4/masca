import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/atoms/Button";
import { FaUsers, FaSprayCan, FaTags, FaShoppingBag, FaMapMarkerAlt, FaListOl, FaShippingFast } from "react-icons/fa";

const adminModules = [
    { title: "Usuarios", desc: "Gestión de clientes y roles", icon: <FaUsers size={28} />, to: "/admin/usuarios" },
    { title: "Perfumes", desc: "Inventario y productos", icon: <FaSprayCan size={28} />, to: "/admin/perfumes" },
    { title: "Marcas", desc: "Gestión de marcas", icon: <FaTags size={28} />, to: "/admin/marcas" },
    { title: "Categorías", desc: "Clasificación de productos", icon: <FaListOl size={28} />, to: "/admin/categorias" },
    { title: "Ubicaciones", desc: "Zonas de despacho", icon: <FaMapMarkerAlt size={28} />, to: "/admin/ubicaciones" },
    { title: "Compras", desc: "Historial de ventas", icon: <FaShoppingBag size={28} />, to: "/admin/compras" },
    { title: "Estados", desc: "Gestión de estados de pedido", icon: <FaShippingFast size={28} />, to: "/admin/estados" },
];

function HomeAdmin() {
    const navigate = useNavigate();

    const handleGoToUser = () => {
        navigate('/');
    };

    return (
        <main className="min-h-screen bg-theme-main p-8">
            <div className="max-w-7xl mx-auto">


                <div className="text-center mb-12 pt-6">
                    <h1 className="text-5xl font-black text-white tracking-wider mb-2">DASHBOARD</h1>
                    <p className="text-xl text-theme-muted border-b border-theme-border inline-block pb-2">Panel de Administración de Mascapitos</p>
                </div>


                <div className="flex justify-end mb-8">
                    <Button
                        onClick={handleGoToUser}
                        text="← Volver a Vista Usuario"
                        className="bg-transparent border border-theme-border text-theme-muted hover:bg-theme-card/50 hover:text-white"
                    />
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminModules.map((mod, index) => (
                        <Link
                            key={index}
                            to={mod.to}
                            className="group block bg-theme-card border border-theme-border p-6 rounded-xl transition-all duration-300 shadow-md 
                                        hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(66,133,244,0.3)]"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-blue-400 p-2 rounded-full bg-theme-main group-hover:bg-blue-500/10 transition-colors">
                                    {mod.icon}
                                </div>
                                <span className="text-sm font-bold text-theme-muted uppercase tracking-wider group-hover:text-blue-300">
                                    Ir →
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-1">{mod.title}</h3>
                            <p className="text-sm text-theme-muted">{mod.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
export default HomeAdmin;