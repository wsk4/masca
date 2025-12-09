import api from './Api'; // Importamos nuestra instancia configurada

class UsuarioService {

    // --- LOGIN REAL CONECTADO AL BACKEND ---
    async login(credenciales) {
        try {
            // 1. Enviar credenciales
            const payload = {
                username: credenciales.correo, // Ojo: backend espera 'username', frontend envía 'correo'
                password: credenciales.contra
            };

            const response = await api.post('/auth/login', payload);
            const { token } = response.data;

            // 2. Guardar el token
            localStorage.setItem('token', token);

            // 3. Obtener "Mis Datos" usando el nuevo endpoint
            // El token se inyecta solo gracias a Api.jsx
            const meResponse = await api.get('/auth/me');

            return meResponse.data; // Retorna el objeto usuario (id, nombre, rol, etc.)

        } catch (err) {
            console.error('Error en login:', err);
            localStorage.removeItem('token'); // Limpiar si falla
            throw err;
        }
    }

    async register(usuario) {
        try {
            const response = await api.post('/auth/register', usuario);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (err) {
            console.error('Error al registrar:', err);
            throw err;
        }
    }

    // --- CRUD ESTÁNDAR ---
    async getAll() {
        return (await api.get('/usuarios')).data;
    }

    async getById(id) {
        return (await api.get(`/usuarios/${id}`)).data;
    }

    async update(id, data) {
        return (await api.put(`/usuarios/${id}`, data)).data;
    }

    async patch(id, data) {
        return (await api.patch(`/usuarios/${id}`, data)).data;
    }

    async delete(id) {
        await api.delete(`/usuarios/${id}`);
        return true;
    }
}

export default new UsuarioService();