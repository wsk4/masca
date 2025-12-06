import React from 'react';

const Button = ({ text, onClick, className = "", type, disabled = false }) => {
    // LÓGICA AUTOMÁTICA:
    // 1. Si pasas un 'type' manual, usa ese.
    // 2. Si NO pasas 'type' pero SÍ pasas 'onClick', asume que es un botón normal ("button").
    // 3. Si NO pasas ni 'type' ni 'onClick' (como en el botón de Guardar del formulario), asume que es "submit".
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