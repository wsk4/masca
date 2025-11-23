// src/components/atoms/Button.jsx

import React from "react";

function Button({ text, onClick, className = "", disabled = false, ...props }) {
	return (
		<button onClick={onClick} disabled={disabled} 
			className={`
                /* CLASES BASE QUE DAN LA FORMA */
				px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200
				focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-text focus:ring-offset-theme-main
                
                /* PRIORIZA LA CLASE QUE VIENE POR PROPS */
				${className} 
                
                /* ESTILOS PREDETERMINADOS (que pueden ser sobrescritos por className) */
				${disabled 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                }
            `} 
            {...props} 
        >
				{text}
		</button>
	);
}

export default Button;