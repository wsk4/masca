import axios from 'axios';
import DetalleCompraService from '../../service/DetalleCompraService'; 

const BASE_URL = 'https://masca-back.onrender.com/api/detalles-compra';

const mockedAxios = {
    get: jasmine.createSpy('get'),
    post: jasmine.createSpy('post'),
    put: jasmine.createSpy('put'),
    patch: jasmine.createSpy('patch'),
    delete: jasmine.createSpy('delete'),
};


DetalleCompraService.axios = mockedAxios; 


describe('Servicio DetalleCompraService', () => {

    beforeEach(() => {
        mockedAxios.get.and.returnValue(Promise.resolve({ data: [] }));
        mockedAxios.post.and.returnValue(Promise.resolve({ data: {} }));
        mockedAxios.put.and.returnValue(Promise.resolve({ data: {} }));
        mockedAxios.patch.and.returnValue(Promise.resolve({ data: {} }));
        mockedAxios.delete.and.returnValue(Promise.resolve(true));

        Object.values(mockedAxios).forEach(spy => spy.calls.reset());
    });
    

    it('getAll debe llamar a axios.get con la URL base', async () => {
        await DetalleCompraService.getAll();

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(BASE_URL);
    });

    it('getById debe llamar a axios.get con la URL y ID correctos', async () => {
        const id = 50;

        await DetalleCompraService.getById(id);

        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/${id}`);
    });
    

    it('create debe llamar a axios.post con la URL base y el payload de datos', async () => {
        const mockData = { compra_id: 1, cantidad: 2 };

        await DetalleCompraService.create(mockData);

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL, mockData);
    });


    it('update debe llamar a axios.put con la URL y datos correctos', async () => {
        const id = 50;
        const mockData = { cantidad: 3 };

        await DetalleCompraService.update(id, mockData);

        expect(mockedAxios.put).toHaveBeenCalledTimes(1);
        expect(mockedAxios.put).toHaveBeenCalledWith(`${BASE_URL}/${id}`, mockData);
    });
    
    it('patch debe llamar a axios.patch con la URL y datos correctos', async () => {
        const id = 50;
        const mockData = { precioUnitario: 100 };

        await DetalleCompraService.patch(id, mockData);

        expect(mockedAxios.patch).toHaveBeenCalledTimes(1);
        expect(mockedAxios.patch).toHaveBeenCalledWith(`${BASE_URL}/${id}`, mockData);
    });

    
    it('delete debe llamar a axios.delete con la URL y ID correctos', async () => {
        const id = 50;

        await DetalleCompraService.delete(id);

        expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
        expect(mockedAxios.delete).toHaveBeenCalledWith(`${BASE_URL}/${id}`);
    });
    
    
    it('getAll debe lanzar el error si la llamada falla', async () => {
        const networkError = new Error('Conexión perdida');
        mockedAxios.get.and.returnValue(Promise.reject(networkError));

        let caughtError;
        try {
            await DetalleCompraService.getAll();
        } catch (err) {
            caughtError = err;
        }

        expect(caughtError).toBe(networkError);
    });
});