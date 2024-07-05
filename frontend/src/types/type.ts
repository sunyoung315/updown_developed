import theme from '@/styles/theme';

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

export type inputProps = {
  inputDir: string;
  inputType?: string;
  inputName: string;
  inputNameColor?: keyof typeof theme;
  placeholder?: string;
  isRequired?: boolean;
  starColor?: keyof typeof theme;
  unit?: string;
  onChange: React.Dispatch<React.SetStateAction<any>>;
};

export type HeaderProps = {
  iconName?: string;
  onClick?: () => void;
  headerName?: string;
  nutritionButton?: boolean;
  search?: boolean;
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  searchFood?: () => void;
};

export type IconButtonProps = {
  iconName?: string;
  onClick?: () => void;
};

export type SearchProps = {
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  searchFood?: () => void;
};
