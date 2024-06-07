import { tokenState } from '@/types/type';
import { create } from 'zustand';

export const tokenStore = create<tokenState>((set) => ({
  // access token 확인
  checkToken: false,
  setCheckToken: (checkToken: boolean) => set({ checkToken }),
}))