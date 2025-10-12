import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Text from "../components/atoms/Text.jsx";
import DynamicForm from "../components/molecules/DynamicForm.jsx";
import Button from "../components/atoms/Button.jsx";

function CrearUsuario() {
    const initialFormData = {
        nombre: "",
        correo: "",
        repetirCorreo: "",
        password: "",
        confirmarPassword: "",
        telefono: "",
        region: "",
        comuna: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    
    const formInputs = [
        {
        id: "nombre",
        type: "text",
        label: "Nombre completo",
        placeholder: "Ingresa tu nombre",
        value: formData.nombre,
        onChange: (e) => setFormData({ ...formData, nombre: e.target.value }),
        },
        {
        id: "correo",
        type: "email",
        label: "Correo",
        placeholder: "Ingresa tu correo",
        value: formData.correo,
        onChange: (e) => setFormData({ ...formData, correo: e.target.value }),
        },
        {
        id: "repetirCorreo",
        type: "email",
        label: "Repetir correo",
        placeholder: "Repite tu correo",
        value: formData.repetirCorreo,
        onChange: (e) => setFormData({ ...formData, repetirCorreo: e.target.value }),
        },
        {
        id: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "Ingresa tu contraseña",
        value: formData.password,
        onChange: (e) => setFormData({ ...formData, password: e.target.value }),
        },
        {
        id: "confirmarPassword",
        type: "password",
        label: "Confirmar contraseña",
        placeholder: "Repite tu contraseña",
        value: formData.confirmarPassword,
        onChange: (e) =>
            setFormData({ ...formData, confirmarPassword: e.target.value }),
        },
        {
        id: "telefono",
        type: "tel",
        label: "Teléfono (opcional)",
        placeholder: "Ingresa tu teléfono",
        value: formData.telefono,
        onChange: (e) => setFormData({ ...formData, telefono: e.target.value }),
        },
    ];

    
    const regiones = ["Región Metropolitana", "Valparaíso", "Biobío"];
    const comunas = ["Santiago", "Maipú", "Las Condes"];

    
    const handleSubmit = () => {
        if (formData.correo !== formData.repetirCorreo) {
        alert("Los correos no coinciden");
        return;
        }
        if (formData.password !== formData.confirmarPassword) {
        alert("Las contraseñas no coinciden");
        return;
        }

        const message = `
        Nombre: ${formData.nombre}
        Correo: ${formData.correo}
        Teléfono: ${formData.telefono}
        Región: ${formData.region}
        Comuna: ${formData.comuna}
        `;
        alert(message);
    };

    
    const handleClear = () => {
        setFormData(initialFormData);
    };

    return (
        <Container className="my-5">
        <Text variant="h1" className="text-center">
            Registro usuario
        </Text>
        <DynamicForm inputs={formInputs} />

        {}
        <div className="d-flex gap-3 my-3">
            <select
            className="form-select"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            >
            <option value="">Seleccione su región</option>
            {regiones.map((region, i) => (
                <option key={i} value={region}>
                {region}
                </option>
            ))}
            </select>

            <select
            className="form-select"
            value={formData.comuna}
            onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
            >
            <option value="">Seleccione su comuna</option>
            {comunas.map((comuna, i) => (
                <option key={i} value={comuna}>
                {comuna}
                </option>
            ))}
            </select>
        </div>

        {}
        <div className="mt-3 d-flex justify-content-center">
            <Button variant="primary" onClick={handleSubmit} className="me-2">
            Registrar
            </Button>
            <Button variant="secondary" onClick={handleClear}>
            Limpiar
            </Button>
        </div>
        </Container>
    );
}

export default CrearUsuario;