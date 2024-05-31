export interface tokenState {
  checkToken: boolean;
  setCheckToken: (checkToken: boolean) => void;
}

export type dietProps = {
  dietId: number;
  category: string;
  dietImg?: string;
  totalCalories?: number;
  isFast?: boolean;
};

export type foodProps = {
  foodId: number;
  foodName: string;
  brandName?: string;
  foodIntake?: string;
  foodCalories?: number;
};

export type buttonProps = {
  buttonName?: string;
  onClick?: () => void;
};
