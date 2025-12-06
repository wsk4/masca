import React from 'react';

const Button = ({ text, onClick, className = "", type, disabled = false }) => {
    // Lógica automática:
    // 1. Si pasas un 'type' manual (ej: "submit"), usa ese.
    // 2. Si NO pasas 'type' pero hay 'onClick', asume que es un botón normal.
    // 3. Si NO hay ni 'type' ni 'onClick' (tu caso en el form), asume que es "submit" para guardar.
    const buttonType = type ? type : (onClick ? "button" : "submit");

    return (
        <button
            type={buttonType}
            onClick={onClick}
            disabled={disabled}
            className={`font-semibold rounded transition-all duration-200 py-2 px-4 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    );
};

export default Button;