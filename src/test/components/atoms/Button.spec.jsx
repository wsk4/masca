import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../../../components/atoms/Button'; 

describe('Componente Button', () => {
    it('aplica estado y estilos de deshabilitado correctamente', () => {
        render(<Button text="No Tocar" disabled={true} />);
        
        const buttonElement = screen.getByRole('button', { name: /No Tocar/i }); 
        
        expect(buttonElement).toBeDisabled();
        expect(buttonElement).toHaveClass('bg-theme-border');
        expect(buttonElement).toHaveClass('cursor-not-allowed');
        expect(buttonElement).not.toHaveClass('bg-theme-accent');
    });
});