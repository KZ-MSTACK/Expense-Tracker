import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <div className="flex flex-col items-center justify-center mb-6">
            <input 
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {previewUrl ? (
                <div className="relative group">
                    <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    />
                    <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash size={16} />
                    </button>
                </div>
            ) : (
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <LuUser size={48} className="text-gray-500" />
                    </div>
                    <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                        onClick={onChooseFile}
                    >
                        <LuUpload size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;