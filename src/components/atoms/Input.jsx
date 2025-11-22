// // src/components/atoms/Input.jsx
// import React from "react";

// const Input = ({ type = "text", placeholder = "", name = "", value = "", onChange = () => { }, required = false, autoComplete = "", className = "",disabled = false, ...props  }) => {
//     if (type === "textarea") {
//         return (
//             <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} autoComplete={autoComplete} disabled={disabled}
//                 className={`w-full px-4 py-2.5 text-sm text-gray-900
//                             border border-gray-300 rounded-lg
//                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                             outline-none transition-all resize-none
//                             placeholder:text-gray-400
//                             ${disabled ? "bg-gray-50 cursor-not-allowed text-gray-500" : ""} ${className} `}
//                 {...props}
//             />
//         );
//     }

//     return (
//         <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} autoComplete={autoComplete}disabled={disabled}
//             className={`w-full px-4 py-2.5 text-sm text-gray-900
//                         border border-gray-300 rounded-lg
//                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                         outline-none transition-all
//                         placeholder:text-gray-400
//                         ${disabled ? "bg-gray-50 cursor-not-allowed text-gray-500" : ""} ${className} `}
//             {...props}
//         />
//     );
// };

// export default Input;
//-------------------------------
import React from "react";

const Input = ({ type = "text", placeholder = "", name = "", value = "", onChange = () => { }, required = false, autoComplete = "", className = "", disabled = false, ...props }) => {
    const baseClass = `
        w-full px-4 py-3 text-sm 
        bg-theme-main text-theme-text 
        border border-theme-border rounded-lg
        placeholder:text-zinc-600
        focus:border-theme-accent focus:ring-1 focus:ring-theme-accent focus:outline-none
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
    `;

    if (type === "textarea") {
        return <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} disabled={disabled} className={`${baseClass} resize-none`} {...props} />;
    }

    return <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} autoComplete={autoComplete} disabled={disabled} className={baseClass} {...props} />;
};

export default Input;