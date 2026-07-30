import { useEffect, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button.tsx';
import PageHeading from '../components/PageHeading.tsx';
import { useProduct, useUpdateProduct } from '../hooks/productQueries.ts';
import {
  imageFileSchema,
  productFormSchema,
  type ProductFormInput,
  type ProductFormOutput,
} from '../schemas/productSchema.ts';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

interface CloudinaryUploadResponse {
  secure_url: string;
}

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { name: '', description: '', price: '' },
  });
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: product, isLoading, isError, error } = useProduct(id);
  const updateProduct = useUpdateProduct();

  useEffect(() => {
    if (!product) return;

    reset({
      name: product.name,
      description: product.description,
      price: String(product.price),
    });
    setExistingImageUrl(product.imageUrl);
    setImagePreview(product.imageUrl);
  }, [product, reset]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageResult = imageFileSchema.safeParse(file);
    if (!imageResult.success) {
      setImageError(imageResult.error.issues[0]?.message ?? 'Invalid image file');
      return;
    }

    setImageFile(imageResult.data);
    setImagePreview(URL.createObjectURL(imageResult.data));
    setImageError(null);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    if (!res.ok) throw new Error('Image upload to Cloudinary failed');
    const data = (await res.json()) as CloudinaryUploadResponse;
    return data.secure_url;
  };

  const onSubmit = async (data: ProductFormOutput) => {
    if (!id) return;

    setSubmitError(null);
    setImageError(null);

    try {
      const imageUrl = imageFile
        ? await uploadToCloudinary(imageFile)
        : existingImageUrl;

      if (!imageUrl) {
        setImageError('Image is required');
        return;
      }

      updateProduct.mutate(
        {
          id,
          product: {
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl,
          },
        },
        {
          onSuccess: () => navigate('/'),
          onError: (err) => setSubmitError(err.message),
        }
      );
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (isLoading) {
    return (
      <div className="add-product-container">
        <p className="product-listings-empty">Loading product...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="add-product-container">
        <p className="product-listings-empty">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="add-product-container">
      <PageHeading title="Edit Product">
        Update the details below to change this sticker in the store.
      </PageHeading>

      <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        {submitError && <p className="add-product-error">{submitError}</p>}

        <div className="form-group">
          <label className="form-label" htmlFor="edit-name">
            Name
          </label>
          <input
            id="edit-name"
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
          <label className="form-label" htmlFor="edit-description">
            Description
          </label>
          <textarea
            id="edit-description"
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
          <label className="form-label" htmlFor="edit-price">
            Price (RM)
          </label>
          <input
            id="edit-price"
            type="number"
            {...register('price')}
            onKeyDown={(e) => {
              if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault();
              }
            }}
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
          <label className="form-label" htmlFor="image-upload-edit">
            Image
          </label>
          <div className="form-file-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-file-input"
              id="image-upload-edit"
              aria-invalid={!!imageError}
            />
            <label htmlFor="image-upload-edit" className="form-file-label">
              {imagePreview ? 'Change Image' : 'Choose Image'}
            </label>
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
          <Button type="submit" variant="pill" disabled={updateProduct.isPending}>
            {updateProduct.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
