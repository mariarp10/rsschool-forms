import { z } from 'zod';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const isOnlyLetters = (value: string) => {
  [...value].every((char) => char.toLowerCase() !== char.toUpperCase());
};

export const createFormSchema = (countries: readonly string[]) =>
  z
    .object({
      name: z
        .string()
        .trim()
        .min(1, 'Name is required')
        .refine(
          (value) => value[0] === value[0]?.toUpperCase(),
          'First letter must be uppercase',
        )
        .refine(isOnlyLetters, 'Name must contain only letters'),

      age: z.coerce
        .number()
        .int('Age must be an integer')
        .nonnegative('Age must not be negative'),

      email: z.string().trim().email('Invalid email address'),

      gender: z.enum(['female', 'male', 'prefer-not-to-say']),

      conditions: z.literal(true, {
        error: 'You must accept Terms and Conditions',
      }),

      image: z
        .instanceof(File)
        .refine((file) => file.size > 0, 'Image is required')
        .refine(
          (file) => ['image/png', 'image/jpeg'].includes(file.type),
          'Only PNG and JPEG images are allowed',
        )
        .refine(
          (file) => file.size <= MAX_IMAGE_SIZE_BYTES,
          'Image size must be less than 5MB',
        ),

      password: z.string().min(1, 'Password is required'),

      confirmPassword: z.string().min(1, 'Confirm password is required'),

      country: z
        .string()
        .trim()
        .min(1, 'Country is required')
        .refine(
          (value) => countries.includes(value),
          'Country must exist in the countries list',
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    });
