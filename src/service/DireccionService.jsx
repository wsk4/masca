import api from './Api';

class DireccionService {
  async getAll() {
    try { return (await api.get('/direcciones')).data; }
    catch (err) { console.error('Error al obtener direcciones:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/direcciones/${id}`)).data; }
    catch (err) { console.error('Error al obtener dirección:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/direcciones', data)).data; }
    catch (err) { console.error('Error al crear dirección:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/direcciones/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar dirección:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/direcciones/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en dirección:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/direcciones/${id}`); return true; }
    catch (err) { console.error('Error al eliminar dirección:', err); throw err; }
  }
}
export default new DireccionService();