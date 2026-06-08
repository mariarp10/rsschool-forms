import { create } from 'zustand';
import { type UserProfile } from '../types';

type ProfilesState = {
  profiles: UserProfile[];

  addProfile: (profile: UserProfile) => void;
};

export const useProfilesStore = create<ProfilesState>()((set) => ({
  profiles: [],

  addProfile: (profile): void => {
    set((state) => ({
      profiles: [profile, ...state.profiles],
    }));
  },
}));
