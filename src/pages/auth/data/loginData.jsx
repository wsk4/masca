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
                className: "mb-6",
            },
            {
                type: "password",
                placeholder: "Contraseña",
                name: "contra", 
                required: true,
                autoComplete: "current-password",
                className: "",
            },
        ],
        className: "space-y-8"
    },
    {           
        type: "button",
        text: "Iniciar Sesión",
        className: "w-full mt-8 mb-4 bg-theme-accent text-black hover:bg-theme-hover font-bold",
    },
    {
        type: "text",
        text: [
            {
                content: (
                    <button
                        type="button"
                        onClick={() => window.location.href = '/registro'} 
                        className="text-theme-muted hover:text-white underline transition w-full text-center block text-sm mt-4"
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