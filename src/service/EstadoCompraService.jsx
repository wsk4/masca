import api from './Api';

class EstadoCompraService {
  async getAll() {
    try { return (await api.get('/estados-compra')).data; }
    catch (err) { console.error('Error al obtener estados de compra:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/estados-compra/${id}`)).data; }
    catch (err) { console.error('Error al obtener estado de compra:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/estados-compra', data)).data; }
    catch (err) { console.error('Error al crear estado de compra:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/estados-compra/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar estado de compra:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/estados-compra/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en estado de compra:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/estados-compra/${id}`); return true; }
    catch (err) { console.error('Error al eliminar estado de compra:', err); throw err; }
  }
}
export default new EstadoCompraService();