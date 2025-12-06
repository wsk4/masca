import React from 'react';

const Button = ({ text, onClick, className = "", type, disabled = false }) => {
    // Detecta si es un botón de acción (click) o de formulario (submit)
    const buttonType = type ? type : (onClick ? "button" : "submit");

    return (
        <button
            type={buttonType}
            onClick={onClick}
            disabled={disabled}
            // Las clases base son mínimas para permitir que 'className' (que viene de ListarUsuarios)
            // controle totalmente los colores (bordes azules/rojos, fondos transparentes, etc.)
            className={`font-semibold rounded transition-all duration-200 py-2 px-4 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    );
};

export default Button;