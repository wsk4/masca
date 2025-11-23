import React from "react";

function Button({ text, onClick, className = "", disabled = false, ...props }) {
    const baseClasses = `
        /* Estilos base: forma, padding, etc. */
        px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200
        border border-transparent
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-text focus:ring-offset-theme-main
    `;
    const interactionClasses = disabled 
        ? 'opacity-70 cursor-not-allowed' 
        : 'hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)]';
    
    return (
        <button onClick={onClick} disabled={disabled} 
            // Concatenamos las clases en este orden para que 'className' (con el color) tenga prioridad
            className={`${baseClasses} ${interactionClasses} ${className}`}
            {...props} 
        >
            {text}
        </button>
    );
}

export default Button;