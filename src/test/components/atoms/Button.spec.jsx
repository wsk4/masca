it('aplica estado y estilos de deshabilitado correctamente', () => {
        render(<Button text="No Tocar" disabled={true} />);
        
        const buttonElement = screen.getByRole('button'); 
        
        expect(buttonElement.disabled).toBe(true);
        
        expect(buttonElement.className).toContain('bg-theme-border');
        
        expect(buttonElement.className).toContain('cursor-not-allowed');
        
        expect(buttonElement.className).not.toContain('bg-theme-accent');
    });