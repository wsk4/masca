import React from 'react';

const Button = ({ text, onClick, className = "", type = "button", disabled = false }) => {
    return (
        <button
            type={type}
            // Este onClick es el más importante, sin él no funcionan los botones
            onClick={onClick} 
            disabled={disabled}
            className={`font-semibold rounded transition-all duration-200 py-2 px-4 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    );
};

export default Button;