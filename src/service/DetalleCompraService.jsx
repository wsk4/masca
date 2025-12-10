import api from './Api';

class DetalleCompraService {
  async getAll() {
    try { return (await api.get('/detalles-compra')).data; }
    catch (err) { console.error('Error al obtener detalles de compra:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/detalles-compra/${id}`)).data; }
    catch (err) { console.error('Error al obtener detalle de compra:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/detalles-compra', data)).data; }
    catch (err) { console.error('Error al crear detalle de compra:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/detalles-compra/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar detalle de compra:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/detalles-compra/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en detalle de compra:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/detalles-compra/${id}`); return true; }
    catch (err) { console.error('Error al eliminar detalle de compra:', err); throw err; }
  }
}
export default new DetalleCompraService();