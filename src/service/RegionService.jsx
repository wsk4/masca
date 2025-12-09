import api from './Api';

class RegionService {
  async getAll() {
    try { return (await api.get('/regiones')).data; }
    catch (err) { console.error('Error al obtener regiones:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/regiones/${id}`)).data; }
    catch (err) { console.error('Error al obtener región:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/regiones', data)).data; }
    catch (err) { console.error('Error al crear región:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/regiones/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar región:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/regiones/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en región:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/regiones/${id}`); return true; }
    catch (err) { console.error('Error al eliminar región:', err); throw err; }
  }
}
export default new RegionService();