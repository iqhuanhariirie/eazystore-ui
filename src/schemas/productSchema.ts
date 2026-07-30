import { z } from 'zod';

const priceField = z
  .string()
  .trim()
  .min(1, 'Price is required')
  .refine((val) => !Number.isNaN(Number(val)), 'Price must be a number')
  .refine(
    (val) => /^-?\d+(\.\d{1,2})?$/.test(val),
    'Price must have at most 2 decimal places'
  )
  .transform((val) => Number(val))
  .pipe(
    z
      .number()
      .gt(0, 'Price must be greater than 0')
      .max(999999.99, 'Price must not exceed 999999.99')
  );

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(500, 'Description must be at most 500 characters'),
  price: priceField,
});

export const imageFileSchema = z
  .instanceof(File, { message: 'Image is required' })
  .refine((file) => file.type.startsWith('image/'), 'File must be an image');

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.output<typeof productFormSchema>;
