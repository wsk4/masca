import React from "react";
import Input from "../atoms/Input";

function DynamicInputs({ Inputs = [], className = "" }) {
  return (
    <>
      {Inputs.map((input, index) => (
        <div key={input.name || index} className={className}>
          {input.type === "select" ? (
            <>
              <label htmlFor={input.name} className="block mb-1 font-medium text-gray-700">
                {input.label}
              </label>
              <select
                id={input.name}
                name={input.name}
                value={input.value}
                onChange={input.onChange}
                required={input.required}
                disabled={input.disabled}
                className={`w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${input.className}`}
              >
                <option value="">Seleccione...</option>
                {input.options && input.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <Input
              type={input.type || "text"}
              placeholder={input.placeholder}
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              required={input.required}
              autoComplete={input.autoComplete}
              disabled={input.disabled}
              className={input.className}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default DynamicInputs;
