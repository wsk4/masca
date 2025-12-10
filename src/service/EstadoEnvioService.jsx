import api from './Api';

class EstadoEnvioService {
  async getAll() {
    try { return (await api.get('/estados-envio')).data; }
    catch (err) { console.error('Error al obtener estados de envío:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/estados-envio/${id}`)).data; }
    catch (err) { console.error('Error al obtener estado de envío:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/estados-envio', data)).data; }
    catch (err) { console.error('Error al crear estado de envío:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/estados-envio/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar estado de envío:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/estados-envio/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en estado de envío:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/estados-envio/${id}`); return true; }
    catch (err) { console.error('Error al eliminar estado de envío:', err); throw err; }
  }
}
export default new EstadoEnvioService();