export interface tokenState {
  checkToken: boolean;
  setCheckToken: (checkToken: boolean) => void;
}

export type dietProps = {
  dietId: number;
  category: string;
  dietImg: string;
  totalCalories: number;
  isFast: boolean;
};
