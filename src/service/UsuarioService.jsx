import api from './Api'; 

class UsuarioService {

    async login(credenciales) {
        try {
          
            const payload = {
                username: credenciales.correo,
                password: credenciales.contra
            };
            
            const response = await api.post('/auth/login', payload);
            const { token } = response.data;

            
            localStorage.setItem('token', token);

          
            const usuariosResponse = await api.get('/usuarios');
            
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
            localStorage.removeItem('token');
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