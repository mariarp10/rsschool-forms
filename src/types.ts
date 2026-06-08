export type UserProfile = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'prefer-not-to-say';
  image: string;
  country: string;
};
