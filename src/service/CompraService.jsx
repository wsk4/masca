import axios from 'axios';
const BASE_URL = 'https://masca-back.onrender.com/api/compra';

class CompraService {
  async getAll() {
    try { return (await axios.get(BASE_URL)).data; }
    catch (err) { console.error('Error al obtener compras:', err); throw err; }
  }
  async getById(id) {
    try { return (await axios.get(`${BASE_URL}/${id}`)).data; }
    catch (err) { console.error('Error al obtener compra:', err); throw err; }
  }
  async create(data) {
    try { return (await axios.post(BASE_URL, data)).data; }
    catch (err) { console.error('Error al crear compra:', err); throw err; }
  }
  async update(id, data) {
    try { return (await axios.put(`${BASE_URL}/${id}`, data)).data; }
    catch (err) { console.error('Error al actualizar compra:', err); throw err; }
  }
  async patch(id, data) {
    try { return (await axios.patch(`${BASE_URL}/${id}`, data)).data; }
    catch (err) { console.error('Error al hacer patch en compra:', err); throw err; }
  }
  async delete(id) {
    try { await axios.delete(`${BASE_URL}/${id}`); return true; }
    catch (err) { console.error('Error al eliminar compra:', err); throw err; }
  }
}
export default new CompraService();
