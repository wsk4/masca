// @vitest-environment jsdom
// ^ Esa línea de arriba es obligatoria si no tienes configurado jsdom en vitest.config.ts

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// IMPORTANTE: Esto habilita los matchers como .toBeDisabled() y .toHaveClass()
import '@testing-library/jest-dom';

// Asegúrate de que esta ruta apunte a tu componente real. 
// Si el test está en la misma carpeta que Button.tsx, usa './Button'
import Button from '../../../components/atoms/Button';

describe('Componente Button', () => {
    it('aplica estado y estilos de deshabilitado correctamente', () => {
        render(<Button text="No Tocar" disabled={true} onClick={undefined} type={undefined} />);
        
        const buttonElement = screen.getByRole('button', { name: /No Tocar/i }); 
        
        // Ahora esto SÍ funcionará
        expect(buttonElement).toBeDisabled();
        
        // Verifica las clases reales que tu componente usa
        expect(buttonElement).toHaveClass('opacity-50');
        expect(buttonElement).toHaveClass('cursor-not-allowed');
        
        // Verifica clases base del botón
        expect(buttonElement).toHaveClass('font-semibold');
    });
});