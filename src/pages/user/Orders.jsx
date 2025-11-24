import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CompraService from "../../service/CompraService";
import DynamicTable from "../../components/molecules/DynamicTable";

function Orders() {
    const { user } = useAuth();
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        if (user) {
            
            CompraService.getAll().then(all =>
                setCompras(all.filter(c => c.usuario?.id === user.id))
            );
        }
    }, [user]);

    if (!user) return <div className="text-center mt-8 text-red-700">Acceso restringido.</div>;

    return (
        <main className="max-w-6xl mx-auto p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">Mis Compras</h1>
            <DynamicTable
                columns={["ID", "Total", "Estado", "Dirección"]}
                data={compras.map(c => [
                    c.id, 
                    c.total ?? "N/A", 
                    c.estadoCompra?.nombre ?? c.estadoEnvio?.nombre ?? "Pendiente",
                    c.usuario?.direccion?.calle ?? "Sin dirección registrada"
                ])}
            />
        </main>
    );
}
export default Orders;