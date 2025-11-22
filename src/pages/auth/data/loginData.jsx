// const loginData = [
//     {
//         // Primer bloque: título en pantalla
//         type: "text",
//         text: [
//             {
//                 content: "Inicio de Sesión", // Texto que se muestra
//                 variant: "h1", // Se renderiza como <h1>
//                 className: "text-center text-4xl font-medium mb-10 text-white", // Estilos aplicados
//             }
//         ]
//     },
//     {
//         // Segundo bloque: inputs del formulario
//         type: "inputs",
//         inputs: [
//             {
//                 // Campo de correo electrónico
//                 type: "email",
//                 placeholder: "Correo Electrónico",
//                 name: "correo", // Nombre usado en formData
//                 required: true, // Valor obligatorio
//                 autoComplete: "off",
//                 className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mb-4",
//             },
//             {
//                 // Campo de contraseña
//                 type: "password",
//                 placeholder: "Contraseña",
//                 name: "contrasena",
//                 required: true,
//                 autoComplete: "current-password",
//                 className: "w-full border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500",
//             },
//         ],
//         className: "space-y-8", // Espaciado entre los inputs
//     },
//     {
//         // Tercer bloque: botón para iniciar sesión
//        type: "button",
//         text: "Iniciar Sesión", // Texto del botón
//         className: "transform w-full mt-4 mb-4 rounded-sm py-2 font-bold duration-300 bg-indigo-600 hover:bg-indigo-400",
//     },
//     {
//         // Cuarto bloque: texto con botón para ir a crear usuario
//         type: "text",
//         text: [
//             {
//                 // JSX que genera un botón clickeable dentro del texto
//                 content: (
//                     <button
//                         type="button"
//                         onClick={() => window.location.href = '/create-user'} // Redirección a /create-user
//                         className="text-indigo-400 hover:text-indigo-300 underline transition"
//                     >
//                         Crear usuario
//                     </button>
//                 ),
//                 variant: "p", // Se muestra como párrafo
//                 className: "text-center text-lg",
//             },
//         ],
//     },
// ];
//
// export default loginData;
//--------------------------------------
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
                name: "contrasena",
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
        // Clases de botón blanco/negro de alto contraste
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
                        className="text-theme-muted hover:text-white underline transition w-full text-center block"
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