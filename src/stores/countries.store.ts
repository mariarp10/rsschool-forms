import { create } from 'zustand';
import { COUNTRIES } from '@utils/constants';

type CountriesState = {
  countries: readonly string[];
};

export const useCountriesStore = create<CountriesState>(() => ({
  countries: COUNTRIES,
}));
