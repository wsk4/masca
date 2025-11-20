import axios from 'axios';

const BASE_URL = 'https://naves-back.onrender.com/api/usuarios';

class UserService {

    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    createUser(usuario){
        return axios.post(`${BASE_URL}`, usuario);
    }
}

export default new UserService();