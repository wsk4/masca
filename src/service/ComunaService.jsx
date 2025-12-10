import api from './Api';

class ComunaService {
  async getAll() {
    try { return (await api.get('/comunas')).data; }
    catch (err) { console.error('Error al obtener comunas:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/comunas/${id}`)).data; }
    catch (err) { console.error('Error al obtener comuna:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/comunas', data)).data; }
    catch (err) { console.error('Error al crear comuna:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/comunas/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar comuna:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/comunas/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en comuna:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/comunas/${id}`); return true; }
    catch (err) { console.error('Error al eliminar comuna:', err); throw err; }
  }
}
export default new ComunaService();