import { type FC, type SubmitEvent, useState } from 'react';
import classNames from 'classnames/bind';
import style from './uncontrolled-form.module.css';
import { useCountriesStore } from '@stores/countries.store';
import { formSchema } from '@utils/form-schema';
import { ValidationMessage } from '../validation-message/validation-message';

const cn = classNames.bind(style);

type FormField =
  | 'name'
  | 'age'
  | 'email'
  | 'gender'
  | 'conditions'
  | 'image'
  | 'password'
  | 'confirmPassword'
  | 'country';

type FormErrors = Partial<Record<FormField, string>>;

const FORM_FIELDS = new Set<string>([
  'name',

  'age',

  'email',

  'gender',

  'conditions',

  'image',

  'password',

  'confirmPassword',

  'country',
]);

const isFormField = (value: unknown): value is FormField =>
  typeof value === 'string' && FORM_FIELDS.has(value);

export const UncontrolledForm: FC = () => {
  const countries = useCountriesStore((state) => state.countries);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { conditions, ...restValues } = Object.fromEntries(formData);

    const values = {
      ...restValues,
      conditions: conditions === 'on',
    };

    const result = formSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (isFormField(field) && nextErrors[field] === undefined) {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);

      return;
    }

    setErrors({});
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />
      <ValidationMessage message={errors.name} />

      <label htmlFor="age">Age</label>
      <input id="age" name="age" type="number" />
      <ValidationMessage message={errors.age} />

      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" />
      <ValidationMessage message={errors.email} />

      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender">
        <option value="">Choose your gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </select>
      <ValidationMessage message={errors.gender} />

      <label htmlFor="conditions">Accept Terms and Conditions</label>
      <input id="conditions" name="conditions" type="checkbox" />
      <ValidationMessage message={errors.conditions} />

      <label htmlFor="image">Image</label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/png,image/jpeg"
      />
      <ValidationMessage message={errors.image} />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="password"
      />
      <ValidationMessage message={errors.password} />

      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="password"
      />
      <ValidationMessage message={errors.confirmPassword} />

      <label htmlFor="country">Country</label>
      <input
        id="country"
        name="country"
        type="text"
        list="countries"
        autoComplete="country-name"
      />
      <datalist id="countries">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <ValidationMessage message={errors.country} />

      <button type="submit">Submit</button>
    </form>
  );
};
