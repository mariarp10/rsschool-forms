import { z } from 'zod';
import { COUNTRIES } from './constants';

const MAX_MB_SIZE = 5;
const BYTES_IN_KB = 1024;
const KB_IN_MB = 1024;

const MAX_IMAGE_SIZE_BYTES = MAX_MB_SIZE * BYTES_IN_KB * KB_IN_MB;

const MIN_PASSWORD_LENGTH = 8;

const startsWithCapitalLetter = (value: string): boolean => {
  const firstLetter = value.at(0);

  return firstLetter === firstLetter?.toLocaleUpperCase();
};

export const isOnlyLetters = (value: string): boolean => {
  if (value.length === 0) {
    return true;
  }

  const segmenter = new Intl.Segmenter();
  const segments = [...segmenter.segment(value)];

  return segments.every(
    ({ segment }) => segment.toLowerCase() !== segment.toUpperCase(),
  );
};

export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .refine(startsWithCapitalLetter, 'Name must start with a capital letter')
      .refine(isOnlyLetters, 'Name must contain only letters'),
    age: z.preprocess(
      (value) => {
        if (value === '' || value === null) {
          return undefined;
        }

        return Number(value);
      },

      z

        .number({
          error: 'Age is required',
        })

        .int('Age must be an integer')

        .nonnegative('Age must not be negative'),
    ),
    email: z.email('Invalid email address'),
    gender: z.enum(
      ['female', 'male', 'prefer-not-to-say'],
      'Please select your gender',
    ),
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
    password: z
      .string()
      .min(1, 'Password is required')
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${String(MIN_PASSWORD_LENGTH)} characters`,
      )
      .refine(
        (value: string): boolean => /[A-Z]/.test(value),
        'Password must contain at least one uppercase letter',
      )
      .refine(
        (value: string): boolean => /[a-z]/.test(value),
        'Password must contain at least one lowercase letter',
      )
      .refine(
        (value: string): boolean => /\d/.test(value),
        'Password must contain at least one number',
      )
      .refine(
        (value: string): boolean => /[^A-Za-z0-9]/.test(value),
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    country: z
      .string()
      .trim()
      .min(1, 'Country is required')
      .refine(
        (value) => COUNTRIES.includes(value),
        'Country must exist in the countries list',
      ),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
