import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import PageHeading from '../components/PageHeading';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_URL = import.meta.env.VITE_API_URL;

export default function AddProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', description: '', price: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            setError('Image is required');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const imageUrl = await uploadToCloudinary(imageFile);

            const res = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    description: form.description,
                    price: parseFloat(form.price),
                    imageUrl,
                }),
            });

            if (!res.ok) throw new Error('Failed to save product');
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-product-container">
            <PageHeading title="Add New Product">
                Fill in the details below to add a new sticker to the store.
            </PageHeading>

            <form onSubmit={handleSubmit} className="add-product-form">
                {error && <p className="add-product-error">{error}</p>}

                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="e.g. Cool Naruto Sticker"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="form-input form-textarea"
                        placeholder="Describe the sticker..."
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Price (RM)</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                        className="form-input"
                        placeholder="e.g. 5.99"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Image</label>
                    <div className="form-file-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-file-input"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" className="form-file-label">
                            {imagePreview ? 'Change Image' : 'Choose Image'}
                        </label>
                        {imageFile && (
                            <span className="form-file-name">{imageFile.name}</span>
                        )}
                    </div>
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
                    <Button type="submit" variant="pill" disabled={loading}>
                        {loading ? 'Saving...' : 'Add Product'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
