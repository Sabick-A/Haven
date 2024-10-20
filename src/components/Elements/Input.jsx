import React, { useId } from "react";

function Input(
    { label, type = "text", placeholder, className = "", labelClassName="", ...props },
    ref
) {
    const id = useId();
    return (
        <div className="w-full  p-5 bg-white rounded-lg font-mono">
            {label && (
                <label
                    className={`block text-center text-gray-700 text-sm font-bold mb-2' ${labelClassName}`}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                className={` border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100 ${className}`}
                placeholder="Enter text here"
                type={type}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
}

export default React.forwardRef(Input);
