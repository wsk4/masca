import React from "react";

function Button({ text, onClick, className = "", disabled = false, ...props }) {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            className={`
                px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-200
                border border-transparent
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-text focus:ring-offset-theme-main
                ${disabled 
                    ? 'bg-theme-border text-theme-muted cursor-not-allowed opacity-70' 
                    : 'bg-theme-accent text-black hover:bg-theme-hover hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                }
                ${className} 
            `} 
            {...props} 
        >
            {text}
        </button>
    );
}

export default Button;