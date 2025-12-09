import api from './Api';

class CategoriaService {
  async getAll() {
    try { return (await api.get('/categorias')).data; }
    catch (err) { console.error('Error al obtener categorías:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/categorias/${id}`)).data; }
    catch (err) { console.error('Error al obtener categoría:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/categorias', data)).data; }
    catch (err) { console.error('Error al crear categoría:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/categorias/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar categoría:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/categorias/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en categoría:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/categorias/${id}`); return true; }
    catch (err) { console.error('Error al eliminar categoría:', err); throw err; }
  }
}
export default new CategoriaService();