import api from './Api';

class PerfumeCategoriaService {
  async getAll() {
    try { return (await api.get('/perfume-categorias')).data; }
    catch (err) { console.error('Error al obtener categorías de perfumes:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/perfume-categorias/${id}`)).data; }
    catch (err) { console.error('Error al obtener categoría de perfume:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/perfume-categorias', data)).data; }
    catch (err) { console.error('Error al crear categoría de perfume:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/perfume-categorias/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar categoría de perfume:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/perfume-categorias/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en categoría de perfume:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/perfume-categorias/${id}`); return true; }
    catch (err) { console.error('Error al eliminar categoría de perfume:', err); throw err; }
  }
}
export default new PerfumeCategoriaService();