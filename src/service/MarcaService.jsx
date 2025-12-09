import api from './Api';

class MarcaService {
  async getAll() {
    try { return (await api.get('/marcas')).data; }
    catch (err) { console.error('Error al obtener marcas:', err); throw err; }
  }
  async getById(id) {
    try { return (await api.get(`/marcas/${id}`)).data; }
    catch (err) { console.error('Error al obtener marca:', err); throw err; }
  }
  async create(data) {
    try { return (await api.post('/marcas', data)).data; }
    catch (err) { console.error('Error al crear marca:', err); throw err; }
  }
  async update(id, data) {
    try { return (await api.put(`/marcas/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar marca:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await api.patch(`/marcas/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en marca:', err); throw err; }
  }
  async delete(id) {
    try { await api.delete(`/marcas/${id}`); return true; }
    catch (err) { console.error('Error al eliminar marca:', err); throw err; }
  }
  // Mantenemos este método aunque sea redundante con delete(id), por si se usa así en algún componente
  async deleteByMarcaId(MarcaId) {
    try { await api.delete(`/marcas/${MarcaId}`); return true; }
    catch (err) { console.error('Error al eliminar marca:', err); throw err; }
  }
}
export default new MarcaService();