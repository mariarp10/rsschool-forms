import { type FC } from 'react';
import { useProfilesStore } from '@stores/profiles.store';
import { type UserProfile } from '../../types';
import classNames from 'classnames/bind';
import style from './profiles.module.css';

const cn = classNames.bind(style);

export const Profiles: FC = () => {
  const profiles: UserProfile[] = useProfilesStore((state) => state.profiles);

  if (profiles.length === 0) {
    return;
  }

  return (
    <ul className={cn('list')}>
      {profiles.map((profile) => {
        const { id, name, age, email, gender, image, country } = profile;

        return (
          <li key={id} className={cn('profile')}>
            <h2>{name}</h2>
            <img src={image} alt="" className={cn('avatar')}></img>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
            <p>Gender: {gender}</p>
            <p>Country: {country}</p>
          </li>
        );
      })}
    </ul>
  );
};
