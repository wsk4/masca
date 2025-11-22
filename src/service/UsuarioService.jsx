import axios from 'axios';

const BASE_URL = 'https://masca-back.onrender.com/api/usuarios';

class UsuarioService {

    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    createUser(usuario){
        return axios.post(`${BASE_URL}`, usuario);
    }
}

export default new UsuarioService();