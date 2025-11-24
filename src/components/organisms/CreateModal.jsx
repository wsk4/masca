import React, { useState, useEffect } from 'react';
import DynamicInputs from '../molecules/DynamicInput';
import Button from '../atoms/Button';
import InputFile from '../atoms/InputFile';
import { uploadToImgBB } from '../../utils/uploadImage';

function CreateModal({
    isOpen,
    onClose,
    onSubmit,
    inputsConfig = [],
    title = "Crear nuevo",
    submitText = "Guardar",
    loading = false,
    initialData = {},
}) {
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    // 🔧 useEffect corregido: se ejecuta al abrir modal y cuando cambian initialData/inputsConfig
    useEffect(() => {
        if (isOpen) {
            const initial = initialData && Object.keys(initialData).length > 0 
                ? { ...initialData } 
                : {};

            if (!initialData || Object.keys(initialData).length === 0) {
                inputsConfig.forEach((input) => {
                    initial[input.name] = input.value || '';
                });
            }

            setFormData(initial);
            setImagePreview(initialData?.logo || null);
        }
    }, [isOpen, initialData, inputsConfig]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const { url, preview } = await uploadToImgBB(file);
            setFormData((prev) => ({ ...prev, logo: url }));
            setImagePreview(preview);
        } catch (error) {
            alert("Error al subir imagen: " + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all">
            <div className="bg-theme-card border border-theme-border rounded-xl shadow-2xl w-full max-w-md p-8 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-theme-muted hover:text-white transition-colors"
                        disabled={loading || uploadingImage}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {inputsConfig.map((input, index) => {
                        if (input.name === "logo") {
                            return (
                                <div key={`logo-${index}`} className="space-y-2">
                                    <label className="text-xs font-bold text-theme-muted uppercase block mb-1">Logo</label>
                                    <InputFile
                                        onChange={handleImageChange}
                                        disabled={uploadingImage || loading}
                                        preview={imagePreview}
                                    />
                                    {uploadingImage && (
                                        <p className="text-xs text-blue-400 flex items-center gap-1">
                                            <span className="inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                                            Optimizando y subiendo...
                                        </p>
                                    )}
                                    {imagePreview && !uploadingImage && (
                                        <p className="text-xs text-green-400 flex items-center gap-1">Imagen lista</p>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={input.name || index} className="space-y-1">
                                <label className="text-xs font-bold text-theme-muted uppercase block mb-1">
                                    {input.placeholder || input.name}
                                </label>
                                <DynamicInputs
                                    Inputs={[{
                                        ...input,
                                        value: formData[input.name] || '',
                                        onChange: handleChange,
                                        className: "bg-theme-main border-theme-border"
                                    }]}
                                />
                            </div>
                        );
                    })}

                    <div className="flex gap-4 pt-6">
                        <Button
                            text={loading ? "Guardando..." : submitText}
                            className={`flex-1 py-3 px-4 ${loading || uploadingImage ? 'opacity-60 cursor-not-allowed' : ''}`}
                            disabled={loading || uploadingImage}
                        />
                        <button
                            onClick={onClose}
                            type="button"
                            className="flex-1 py-3 px-4 rounded-lg font-bold bg-transparent text-theme-muted border border-theme-border hover:bg-theme-main active:scale-95 transition-all"
                            disabled={loading || uploadingImage}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateModal;
