import axios from 'axios';
import CompraService from '../../service/CompraService'; 

const BASE_URL = 'https://masca-back.onrender.com/api/compras';

const mockedAxios = {
    get: jasmine.createSpy('get'),
    post: jasmine.createSpy('post'),
    put: jasmine.createSpy('put'),
    patch: jasmine.createSpy('patch'),
    delete: jasmine.createSpy('delete'),
};



describe('Servicio CompraService', () => {

    beforeEach(() => {

        mockedAxios.get.and.returnValue(Promise.resolve({ data: [] }));
        mockedAxios.post.and.returnValue(Promise.resolve({ data: {} }));
        mockedAxios.put.and.returnValue(Promise.resolve({ data: {} }));
        mockedAxios.patch.and.returnValue(Promise.resolve({ data: {} }));
        mockedAxios.delete.and.returnValue(Promise.resolve(true));



        Object.values(mockedAxios).forEach(spy => spy.calls.reset());
    });
    

    it('getAll debe llamar a axios.get con la URL base', async () => {
        CompraService.axios = mockedAxios; 

        await CompraService.getAll();

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL);
    });

    it('getById debe llamar a axios.get con la URL y ID correctos', async () => {
        CompraService.axios = mockedAxios;
        const id = 12;

        await CompraService.getById(id);

        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/${id}`);
    });
    

    it('create debe llamar a axios.post con la URL base y el payload de datos', async () => {
        CompraService.axios = mockedAxios;
        const mockData = { total: 500 };

        await CompraService.create(mockData);

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL, mockData);
    });


    it('update debe llamar a axios.put con la URL y datos correctos', async () => {
        CompraService.axios = mockedAxios;
        const id = 12;
        const mockData = { total: 600 };

        await CompraService.update(id, mockData);

        expect(mockedAxios.put).toHaveBeenCalledTimes(1);
        expect(mockedAxios.put).toHaveBeenCalledWith(`${BASE_URL}/${id}`, mockData);
    });
    
    it('patch debe llamar a axios.patch con la URL y datos correctos', async () => {
        CompraService.axios = mockedAxios;
        const id = 12;
        const mockData = { total: 700 };

        await CompraService.patch(id, mockData);

        expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
        expect(mockedAxios.patch).toHaveBeenCalledWith(`${BASE_URL}/${id}`, mockData);
    });

    
    it('delete debe llamar a axios.delete con la URL y ID correctos', async () => {
        CompraService.axios = mockedAxios;
        const id = 12;

        await CompraService.delete(id);

        expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
        expect(mockedAxios.delete).toHaveBeenCalledWith(`${BASE_URL}/${id}`);
    });
    
    
    it('getAll debe lanzar el error si la llamada falla', async () => {
        CompraService.axios = mockedAxios;
        const networkError = new Error('Network Error');
        mockedAxios.get.and.returnValue(Promise.reject(networkError));

        let caughtError;
        try {
            await CompraService.getAll();
        } catch (err) {
            caughtError = err;
        }

        expect(caughtError).toBe(networkError);
    });
});