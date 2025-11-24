import React from 'react';

import loginData from '../../pages/auth/loginData';
    it('debería ser un array con 4 bloques de contenido principal', () => {
        expect(loginData).toBeTruthy();
        expect(Array.isArray(loginData)).toBe(true);
        expect(loginData.length).toBe(4);
    });

    it('el primer bloque (índice 0) debería ser el título principal (h1)', () => {
        const titleBlock = loginData[0];
        
        expect(titleBlock.type).toBe('text');
        expect(titleBlock.text[0].content).toBe('Iniciar Sesión');
        expect(titleBlock.text[0].variant).toBe('h1');
    });

    it('el segundo bloque (índice 1) debería contener los inputs de correo y contraseña', () => {
        const inputsBlock = loginData[1];
        
        expect(inputsBlock.type).toBe('inputs');
        expect(inputsBlock.inputs.length).toBe(2); 

        const emailInput = inputsBlock.inputs.find(input => input.name === 'correo');
        expect(emailInput).toBeTruthy();
        expect(emailInput.type).toBe('email');
        expect(emailInput.placeholder).toBe('Correo Electrónico');
        expect(emailInput.required).toBe(true);

        const passwordInput = inputsBlock.inputs.find(input => input.name === 'contra');
        expect(passwordInput).toBeTruthy();
        expect(passwordInput.type).toBe('password');
        expect(passwordInput.placeholder).toBe('Contraseña');
        expect(passwordInput.required).toBe(true);
    });

    it('el tercer bloque (índice 2) debería ser el botón de submit "Iniciar Sesión"', () => {
        const buttonBlock = loginData[2];
        
        expect(buttonBlock.type).toBe('button');
        expect(buttonBlock.text).toBe('Iniciar Sesión');
    });
    
    it('el cuarto bloque (índice 3) debería ser el enlace "Crear usuario"', () => {
        const registerLinkBlock = loginData[3];
        
        expect(registerLinkBlock.type).toBe('text');
        

        expect(typeof registerLinkBlock.text[0].content).toBe('function'); 
        

    });
;