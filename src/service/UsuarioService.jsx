import axios from 'axios';

const BASE_URL = 'https://masca-back.onrender.com/api/usuarios';

class UsuarioService {

    // --- LOGIN SIMULADO (SOLUCIÓN) ---
    async login(credenciales) {
        try {
            // 1. Obtenemos todos los usuarios existentes del backend
            const response = await axios.get(BASE_URL);
            const usuarios = response.data;

            // 2. Buscamos el usuario por correo (ignorando mayúsculas/minúsculas)
            const usuarioEncontrado = usuarios.find(u => 
                u.correo.toLowerCase() === credenciales.correo.toLowerCase()
            );

            // 3. Validación (Solo por correo)
            if (usuarioEncontrado) {
                // Simulamos éxito devolviendo el usuario encontrado
                return usuarioEncontrado;
            } else {
                throw new Error("Usuario no encontrado");
            }
        } catch (err) {
            console.error('Error en login simulado:', err);
            throw err;
        }
    }
    // ---------------------------------

    async createUser(usuario) {
        try { return (await axios.post(BASE_URL, usuario)).data; }
        catch (err) { console.error('Error al crear usuario:', err); throw err; }
    }

    async getAll() {
        try { return (await axios.get(BASE_URL)).data; }
        catch (err) { console.error('Error al obtener usuarios:', err); throw err; }
    }

    async getById(id) {
        try { return (await axios.get(`${BASE_URL}/${id}`)).data; }
        catch (err) { console.error('Error al obtener usuario:', err); throw err; }
    }

    async update(id, data) {
        try { return (await axios.put(`${BASE_URL}/${id}`, data)).data; }
        catch (err) { console.error('Error al actualizar usuario:', err); throw err; }
    }

    async patch(id, data) {
        try { return (await axios.patch(`${BASE_URL}/${id}`, data)).data; }
        catch (err) { console.error('Error al hacer patch en usuario:', err); throw err; }
    }

    async delete(id) {
        try { await axios.delete(`${BASE_URL}/${id}`); return true; }
        catch (err) { console.error('Error al eliminar usuario:', err); throw err; }
    }
}

export default new UsuarioService();