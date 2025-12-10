import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import CrearEditarUsuario from './CrearEditarUsuario';
import DireccionService from '../../../service/DireccionService';

describe('CrearEditarUsuario (Karma + Jasmine Nativo)', () => {
    let container = null;
    let onSubmitSpy = null;
    let onCloseSpy = null;


    const mockDirecciones = [
        { id: 10, calle: 'Av. Siempre Viva', numero: 742, comuna: { nombre: 'Springfield' } },
        { id: 20, calle: 'Calle Falsa', numero: 123, comuna: { nombre: 'Lugar' } }
    ];

    const mockInitialUser = {
        id: 99,
        nombre: 'Matias Existente',
        correo: 'matias@test.com',
        telefono: '12345678',
        rol: { id: 2 },
        direccion: { id: 10 }
    };

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
 
        onSubmitSpy = jasmine.createSpy('onSubmit');
        onCloseSpy = jasmine.createSpy('onClose');

        spyOn(DireccionService, 'getAll').and.returnValue(Promise.resolve(mockDirecciones));
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
        container = null;
    });


    const changeInputValue = (input, value) => {

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(input, value);
        

        const ev = new Event('input', { bubbles: true });
        input.dispatchEvent(ev);
    };

    const changeSelectValue = (select, value) => {
        select.value = value;
        const ev = new Event('change', { bubbles: true });
        select.dispatchEvent(ev);
    };

    it('debe cargar las direcciones al abrirse (useEffect)', async () => {

        await act(async () => {
            ReactDOM.render(
                <CrearEditarUsuario 
                    isOpen={true} 
                    onClose={onCloseSpy} 
                    onSubmit={onSubmitSpy} 
                />, 
                container
            );
        });


        expect(DireccionService.getAll).toHaveBeenCalled();

        const direccionSelect = container.querySelector('select[name="direccion"]');

        expect(direccionSelect.options.length).toBe(3);
        expect(direccionSelect.textContent).toContain('Av. Siempre Viva #742');
    });

    it('debe enviar el formulario correctamente formateado al crear (Create Mode)', async () => {
        await act(async () => {
            ReactDOM.render(
                <CrearEditarUsuario 
                    isOpen={true} 
                    onClose={onCloseSpy} 
                    onSubmit={onSubmitSpy} 
                />, 
                container
            );
        });

   
        const nombreInput = container.querySelector('input[name="nombre"]');
        const correoInput = container.querySelector('input[name="correo"]');
        const contraInput = container.querySelector('input[name="contra"]');
        const rolSelect = container.querySelector('select[name="rol"]');
        const dirSelect = container.querySelector('select[name="direccion"]');
  
        const submitBtn = container.querySelector('button[type="submit"]') || container.querySelector('.btn-save'); 

        act(() => {
            changeInputValue(nombreInput, 'Nuevo Usuario');
            changeInputValue(correoInput, 'nuevo@test.com');
            changeInputValue(contraInput, 'password123');
            changeSelectValue(rolSelect, "1"); 
            changeSelectValue(dirSelect, "20"); 
        });


        await act(async () => {
            submitBtn.click();
        });


        expect(onSubmitSpy).toHaveBeenCalled();
        

        const payload = onSubmitSpy.calls.mostRecent().args[0];

        expect(payload.nombre).toBe('Nuevo Usuario');
        expect(payload.rol).toEqual({ id: 1 }); 
        expect(payload.direccion).toEqual({ id: 20 });
        expect(payload.contra).toBe('password123');
    });

    it('debe omitir la contraseña si se deja vacía al editar (Edit Mode)', async () => {
        await act(async () => {
            ReactDOM.render(
                <CrearEditarUsuario 
                    isOpen={true} 
                    onClose={onCloseSpy} 
                    onSubmit={onSubmitSpy}
                    initialData={mockInitialUser} 
                />, 
                container
            );
        });

        const nombreInput = container.querySelector('input[name="nombre"]');
        const contraInput = container.querySelector('input[name="contra"]');
        const submitBtn = container.querySelector('button[type="submit"]');


        expect(nombreInput.value).toBe('Matias Existente');
        expect(contraInput.value).toBe(''); 

        act(() => {
            changeInputValue(nombreInput, 'Matias Editado');

        });

        await act(async () => {
            submitBtn.click();
        });

        const payload = onSubmitSpy.calls.mostRecent().args[0];


        expect(payload.id).toBe(99);
        expect(payload.nombre).toBe('Matias Editado');

        expect(payload.contra).toBeUndefined(); 
    });

    it('debe incluir la contraseña al editar si el usuario escribe una nueva', async () => {
        await act(async () => {
            ReactDOM.render(
                <CrearEditarUsuario 
                    isOpen={true} 
                    onClose={onCloseSpy} 
                    onSubmit={onSubmitSpy}
                    initialData={mockInitialUser}
                />, 
                container
            );
        });

        const contraInput = container.querySelector('input[name="contra"]');
        const submitBtn = container.querySelector('button[type="submit"]');

        act(() => {
            changeInputValue(contraInput, 'NuevaClave123');
        });

        await act(async () => {
            submitBtn.click();
        });

        const payload = onSubmitSpy.calls.mostRecent().args[0];
        expect(payload.contra).toBe('NuevaClave123');
    });
});