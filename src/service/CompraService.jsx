import api from './Api';

class CompraService {
  async getAll() {
    try { return (await api.get('/compras')).data; }
    catch (err) { console.error('Error al obtener compras:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/compras/${id}`)).data; }
    catch (err) { console.error('Error al obtener compra:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/compras', data)).data; }
    catch (err) { console.error('Error al crear compra:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/compras/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar compra:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/compras/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en compra:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/compras/${id}`); return true; }
    catch (err) { console.error('Error al eliminar compra:', err); throw err; }
  }
}
export default new CompraService();