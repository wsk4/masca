import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // Es opcional (?) porque tu lógica lo evalúa
    className?: string;
    type?: "button" | "submit" | "reset"; // Limitamos a los tipos válidos de botón HTML
    disabled?: boolean;
}

const Button = ({ 
    text, 
    onClick, 
    className = "", 
    type, 
    disabled = false 
}: ButtonProps) => {
    
    // Detecta si es un botón de acción (click) o de formulario (submit)
    // TypeScript inferirá que buttonType es "button" | "submit" | "reset" | undefined
    const buttonType = type ? type : (onClick ? "button" : "submit");

    return (
        <button
            type={buttonType}
            onClick={onClick}
            disabled={disabled}
            // Las clases base son mínimas
            className={`font-semibold rounded transition-all duration-200 py-2 px-4 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    );
};

export default Button;