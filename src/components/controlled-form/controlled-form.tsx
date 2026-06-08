import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@utils/form-schema';
import { type z } from 'zod';
import { convertToBase64 } from '@utils/convert-to-base64';
import { type UserProfile } from '../../types';
import { useProfilesStore } from '@stores/profiles.store';
import { ValidationMessage } from '@components/validation-message/validation-message';
import { useCountriesStore } from '@stores/countries.store';
import classNames from 'classnames/bind';
import style from './controlled-form.module.css';

const cn = classNames.bind(style);

type FormInputValues = z.input<typeof formSchema>;
type FormOutputValues = z.output<typeof formSchema>;

const createEmptyFile = (): File => new File([], '');

type ControlledFormProps = {
  closeModal: () => void;
};

export const ControlledForm: FC<ControlledFormProps> = ({ closeModal }) => {
  const addProfile = useProfilesStore((state) => state.addProfile);
  const countries = useCountriesStore((state) => state.countries);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputValues, unknown, FormOutputValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const handleValidSubmit = async (data: FormOutputValues) => {
    const imageBase64 = await convertToBase64(data.image);
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      image: imageBase64,
      country: data.country,
    };

    addProfile(profile);

    closeModal();
  };

  return (
    <form
      className={cn('form')}
      onSubmit={(event) => {
        void handleSubmit(handleValidSubmit)(event);
      }}
      noValidate
    >
      <label htmlFor="controlled-name">Name</label>
      <input id="controlled-name" type="text" {...register('name')} />
      <ValidationMessage message={errors.name?.message} />

      <label htmlFor="controlled-age">Age</label>
      <input id="controlled-age" type="number" {...register('age')} />
      <ValidationMessage message={errors.age?.message} />

      <label htmlFor="controlled-email">Email address</label>
      <input id="controlled-email" type="email" {...register('email')} />
      <ValidationMessage message={errors.email?.message} />

      <label htmlFor="controlled-gender">Gender</label>
      <select id="controlled-gender" {...register('gender')}>
        <option value="">Choose your gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
      <ValidationMessage message={errors.gender?.message} />

      <label htmlFor="controlled-conditions">
        Accept Terms and Conditions
        <input
          id="controlled-conditions"
          type="checkbox"
          {...register('conditions')}
        />
      </label>
      <ValidationMessage message={errors.conditions?.message} />
      <label htmlFor="controlled-image">Image</label>
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <input
            id="controlled-image"
            name={field.name}
            ref={field.ref}
            type="file"
            accept="image/png,image/jpeg"
            onChange={(event) => {
              field.onChange(event.target.files?.[0] ?? createEmptyFile());
            }}
          />
        )}
      />
      <ValidationMessage message={errors.image?.message} />

      <label htmlFor="controlled-password">Password</label>
      <input
        id="controlled-password"
        type="password"
        autoComplete="password"
        {...register('password')}
      />
      <ValidationMessage message={errors.password?.message} />

      <label htmlFor="controlled-confirm-password">Confirm password</label>
      <input
        id="controlled-confirm-password"
        type="password"
        autoComplete="password"
        {...register('confirmPassword')}
      />
      <ValidationMessage message={errors.confirmPassword?.message} />

      <label htmlFor="controlled-country">Country</label>
      <input
        id="controlled-country"
        type="text"
        list="controlled-countries"
        autoComplete="country-name"
        {...register('country')}
      />

      <datalist id="controlled-countries">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <ValidationMessage message={errors.country?.message} />

      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
    </form>
  );
};
