const loginData = [
    {
        type: "text",
        text: [
            {
                content: "Iniciar Sesión",
                variant: "h1",
                className: "text-center text-4xl font-bold mb-8 text-white tracking-wider",
            }
        ]
    },
    {
        type: "inputs",
        inputs: [
            {
                type: "email",
                placeholder: "Correo Electrónico",
                name: "correo",
                required: true,
                autoComplete: "off",
                className: "mb-6 w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-white",
            },
            {
                type: "password",
                placeholder: "Contraseña",
                name: "contra", 
                required: true,
                autoComplete: "current-password",
                className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-white",
            },
        ],
        className: "space-y-8"
    },
    // 1. BOTÓN PRINCIPAL: ALTO CONTRASTE (BLANCO/NEGRO)
    {           
        type: "button",
        text: "Iniciar Sesión",
        // CAMBIO CRÍTICO: Usamos bg-white nativo + appearance-none para resetear Bootstrap/navegador
        className: "transform w-full mt-8 mb-4 py-2.5 font-bold bg-white text-black rounded-lg hover:bg-theme-hover active:scale-95 transition-all border-none appearance-none",
    },
    // 2. ENLACE SECUNDARIO: VISIBLE (GRIS SUAVE/BLANCO)
    {
        type: "text",
        text: [
            {
                content: (
                    <button
                        type="button"
                        onClick={() => window.location.href = '/registro'} 
                        className="text-theme-muted hover:text-white underline transition block w-full text-center text-sm"
                    >
                        Crear usuario
                    </button>
                ),
                variant: "p",
                className: "text-center text-sm",
            },
        ],
    },
];

export default loginData;