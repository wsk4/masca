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
                // Clases que aseguran que el Input.jsx temado se vea bien
                className: "mb-6 w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-white",
            },
            {
                type: "password",
                placeholder: "Contraseña",
<<<<<<< HEAD
                name: "contra", // ¡Correcto! Coincide con el estado en login.jsx
=======
                name: "contra", 
>>>>>>> a15f17d0ec3510e43e00713b5286e29484d30448
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
        // Clases que fuerzan el botón blanco (theme-accent) y texto negro (text-black)
        className: "transform w-full mt-8 mb-4 py-2.5 font-bold bg-theme-accent text-black rounded-lg hover:bg-theme-hover active:scale-95 transition-all",
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
                        // Clases que aseguran que el texto sea visible (muted)
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