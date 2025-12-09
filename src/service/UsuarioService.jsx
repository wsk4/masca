import api from './Api'; // Importamos nuestra instancia configurada

class UsuarioService {

    // --- LOGIN REAL CONECTADO AL BACKEND ---
    async login(credenciales) {
        try {
            // 1. Enviar correo y contraseña al endpoint /auth/login
            // Mapeamos 'correo' a 'username' porque eso espera tu backend Java
            const payload = {
                username: credenciales.correo,
                password: credenciales.contra
            };
            
            const response = await api.post('/auth/login', payload);
            const { token } = response.data;

            // 2. Guardar el token inmediatamente para usarlo en el siguiente paso
            localStorage.setItem('token', token);

            // 3. Obtener los datos del usuario logueado
            // Como el backend solo devuelve el token, buscamos nuestros datos
            // (El token se envía automágicamente gracias a api.jsx)
            const usuariosResponse = await api.get('/usuarios');
            
            // Buscamos coincidencia por correo
            const usuarioEncontrado = usuariosResponse.data.find(u => 
                u.correo.toLowerCase() === credenciales.correo.toLowerCase() ||
                u.nombre.toLowerCase() === credenciales.correo.toLowerCase()
            );

            if (usuarioEncontrado) {
                return usuarioEncontrado;
            } else {
                throw new Error("Token válido, pero no se pudieron recuperar los datos del usuario.");
            }

        } catch (err) {
            console.error('Error en login:', err);
            // Limpiamos token si falló algo a medio camino
            localStorage.removeItem('token');
            throw err;
        }
    }

    async register(usuario) {
        try {
            const response = await api.post('/auth/register', usuario);
            // Tu backend devuelve token al registrarse
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (err) {
            console.error('Error al registrar:', err);
            throw err;
        }
    }

    // --- CRUD ESTÁNDAR USANDO LA INSTANCIA 'api' ---
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