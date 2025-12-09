import api from './Api';

class PerfumeService {
  async getAll() {
    try { return (await api.get('/perfumes')).data; }
    catch (err) { console.error('Error al obtener perfumes:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/perfumes/${id}`)).data; }
    catch (err) { console.error('Error al obtener perfume:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/perfumes', data)).data; }
    catch (err) { console.error('Error al crear perfume:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/perfumes/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar perfume:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/perfumes/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en perfume:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/perfumes/${id}`); return true; }
    catch (err) { console.error('Error al eliminar perfume:', err); throw err; }
  }
}
export default new PerfumeService();