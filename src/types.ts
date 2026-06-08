export type UserProfile = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: 'Male' | 'Female' | 'Prefer not to say';
  image: string;
  country: string;
};
