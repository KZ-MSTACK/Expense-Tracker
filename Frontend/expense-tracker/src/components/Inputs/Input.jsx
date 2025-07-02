import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    return (
        <div className="w-full">
            {label && <label className="block text-[13px] text-slate-800 mb-1">{label}</label>}

            <div className="w-full flex items-center justify-between text-sm text-black bg-slate-100 rounded px-4 py-3 border border-slate-200">
                <input
                    type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={onChange} // Simplified this
                />

                {type === "password" && (
                    <button 
                        type="button" 
                        onClick={toggleShowPassword}
                        className="text-slate-400 hover:text-primary transition-colors"
                    >
                        {showPassword ? (
                            <FaRegEye size={18} />
                        ) : (
                            <FaRegEyeSlash size={18} />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Input