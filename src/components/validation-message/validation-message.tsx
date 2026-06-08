import { type FC } from 'react';
import style from './validation-message.module.css';

import classNames from 'classnames/bind';

const cn = classNames.bind(style);

type ValidationMessageProps = {
  message?: string;
};

export const ValidationMessage: FC<ValidationMessageProps> = ({ message }) => (
  <p className={cn('error')} aria-live="polite">
    {message ?? ''}
  </p>
);
