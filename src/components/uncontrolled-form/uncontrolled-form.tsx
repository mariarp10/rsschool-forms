import { type FC } from 'react';
import classNames from 'classnames/bind';
import style from './uncontrolled-form.module.css';

const cn = classNames.bind(style);

export const UncontrolledForm: FC = ({}) => {
  return (
    <form className={cn('form')}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />

      <label htmlFor="age">Age</label>
      <input id="age" name="age" type="number" />

      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" />

      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender">
        <option value="">Choose your gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </select>

      <label htmlFor="conditions">Accept Terms and Conditions</label>
      <input id="conditions" name="conditions" type="checkbox" />

      <label htmlFor="image">Image</label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/png,image/jpeg"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="password"
      />

      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="password"
      />

      <label htmlFor="country">Country</label>
      <input id="country" name="country" type="text" />

      <button type="submit">Submit</button>
    </form>
  );
};