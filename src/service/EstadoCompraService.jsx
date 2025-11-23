import axios from 'axios';
const BASE_URL = 'https://masca-back.onrender.com/api/estados-compra';

class EstadoCompraService {
  async getAll() {
    try { return (await axios.get(BASE_URL)).data; }
    catch (err) { console.error('Error al obtener estados de compra:', err); throw err; }
  }
  async getById(id) {
    try { return (await axios.get(`${BASE_URL}/${id}`)).data; }
    catch (err) { console.error('Error al obtener estado de compra:', err); throw err; }
  }
  async create(data) {
    try { return (await axios.post(BASE_URL, data)).data; }
    catch (err) { console.error('Error al crear estado de compra:', err); throw err; }
  }
  async update(id, data) {
    try { return (await axios.put(`${BASE_URL}/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar estado de compra:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await axios.patch(`${BASE_URL}/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en estado de compra:', err); throw err; }
  }
  async delete(id) {
    try { await axios.delete(`${BASE_URL}/${id}`); return true; }
    catch (err) { console.error('Error al eliminar estado de compra:', err); throw err; }
  }
}
export default new EstadoCompraService();
