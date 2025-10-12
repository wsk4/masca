import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Text from '../components/atoms/Text.jsx';
import DynamicForm from '../components/molecules/DynamicForm.jsx';
import Button from '../components/atoms/Button.jsx';

function Login() {
    
    const initialFormData = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    
    const formInputs = [
        {
            id: 'email',
            type: 'email',
            label: 'Correo',
            placeholder: 'Ingresa tu correo',
            value: formData.email,
            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
        },
        {
            id: 'password',
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Ingresa tu contraseña',
            value: formData.password,
            onChange: (e) => setFormData({ ...formData, password: e.target.value }),
        },
    ];

    
    const handleSubmit = () => {
        const message = `Correo: ${formData.email}\nContraseña: ${formData.password}`;
        alert(message);
    };

    
    const handleClear = () => {
        setFormData(initialFormData);
    };

    return (
        <Container className="my-5">
            <Text variant="h1">Iniciar Sesión</Text>
            <Text variant="p">Llena el formulario para ingresar</Text>
            <DynamicForm inputs={formInputs} />
            <div className="mt-3">
                <Button variant="primary" onClick={handleSubmit} className="me-2">
                    Ingresar
                </Button>
                <Button variant="secondary" onClick={handleClear}>
                    Limpiar
                </Button>
            </div>
        </Container>
    );
}

export default Login;