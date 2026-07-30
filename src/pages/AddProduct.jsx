import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import PageHeading from '../components/PageHeading';
import { useCreateProduct } from '../hooks/productQueries';
import { imageFileSchema, productFormSchema } from '../schemas/productSchema';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function AddProduct() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productFormSchema),
        defaultValues: { name: '', description: '', price: '' },
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const createProduct = useCreateProduct();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setImageError(null);
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('cloud_name', CLOUD_NAME);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: 'POST', body: formData }
        );
        if (!res.ok) throw new Error('Image upload to Cloudinary failed');
        const data = await res.json();
        return data.secure_url;
    };

    const onSubmit = async (data) => {
        const imageResult = imageFileSchema.safeParse(imageFile);
        if (!imageResult.success) {
            setImageError(imageResult.error.issues[0]?.message ?? 'Image is required');
            return;
        }

        setSubmitError(null);
        setImageError(null);

        try {
            const imageUrl = await uploadToCloudinary(imageResult.data);

            createProduct.mutate(
                {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    imageUrl,
                },
                {
                    onSuccess: () => navigate('/'),
                    onError: (err) => setSubmitError(err.message),
                }
            );
        } catch (err) {
            setSubmitError(err.message);
        }
    };

    return (
        <div className="add-product-container">
            <PageHeading title="Add New Product">
                Fill in the details below to add a new sticker to the store.
            </PageHeading>

            <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
                {submitError && <p className="add-product-error">{submitError}</p>}

                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        aria-invalid={!!errors.name}
                        className="form-input"
                        placeholder="e.g. Cool Naruto Sticker"
                    />
                    {errors.name && (
                        <p className="form-field-error">{errors.name.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register('description')}
                        aria-invalid={!!errors.description}
                        rows={3}
                        className="form-input form-textarea"
                        placeholder="Describe the sticker..."
                    />
                    {errors.description && (
                        <p className="form-field-error">{errors.description.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="price">
                        Price (RM)
                    </label>
                    <input
                        id="price"
                        type="number"
                        {...register('price')}
                        aria-invalid={!!errors.price}
                        step="0.01"
                        className="form-input"
                        placeholder="e.g. 5.99"
                    />
                    {errors.price && (
                        <p className="form-field-error">{errors.price.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="image-upload">
                        Image
                    </label>
                    <div className="form-file-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-file-input"
                            id="image-upload"
                            aria-invalid={!!imageError}
                        />
                        <label htmlFor="image-upload" className="form-file-label">
                            {imagePreview ? 'Change Image' : 'Choose Image'}
                        </label>
                        {imageFile && (
                            <span className="form-file-name">{imageFile.name}</span>
                        )}
                    </div>
                    {imageError && <p className="form-field-error">{imageError}</p>}
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="form-image-preview"
                        />
                    )}
                </div>

                <div className="form-actions">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="pill" disabled={createProduct.isPending}>
                        {createProduct.isPending ? 'Saving...' : 'Add Product'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
