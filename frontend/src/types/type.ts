import theme from '@/styles/theme';
import iconPaths from '@/styles/icon';

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

type foodProps = {
  foodId: number;
  foodName: string;
  brandName?: string;
  foodIntake?: number;
  foodCalories?: number;
  method?: boolean;
};

type exerciseProps = {
  exerciseId: number;
  exerciseName: string;
  exerciseTime: number;
  exerciseBurned: number;
  exerciseCount?: number;
  exerciseWeight?: number;
  exerciseDistance?: number;
  method?: boolean;
};

type commonProps = {
  type: 'diet' | 'exercise';
};

type dietCommonProps = commonProps & {
  type: 'diet';
  info: foodProps;
};

type exerciseCommonProps = commonProps & {
  type: 'exercise';
  info: exerciseProps;
};

export type boxProps = dietCommonProps | exerciseCommonProps;

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
  value?: string | number;
};

export type headerProps = {
  iconName: keyof typeof iconPaths;
  onClick?: () => void;
  headerName?: string;
  nutritionButton?: boolean;
  search?: boolean;
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  searchFood?: () => void;
};

export type iconButtonProps = {
  iconName: keyof typeof iconPaths;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type searchProps = {
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  search?: () => void;
};

type foodResult = {
  foodInfoId: number;
  foodInfoName: string;
  brandName: string;
  foodInfoCalories: number;
};

type exerciseResult = {
  exerciseInfoId: number;
  exerciseName: string;
  met: number;
};

// type에 따른 조건부 타입 지정
type commonResultProps = {
  type: 'diet' | 'exercise';
  category: string;
};

type dietSearchResultProps = commonResultProps & {
  type: 'diet';
  result: foodResult;
};

type exerciseSearchResultProps = commonResultProps & {
  type: 'exercise';
  result: exerciseResult;
};

export type searchResultProps =
  | dietSearchResultProps
  | exerciseSearchResultProps;

export type infoProps = {
  infodir?: string;
  title?: string;
  content?: string | number;
  isRequired?: boolean;
  starColor?: keyof typeof theme;
  titleColor?: keyof typeof theme;
  unit?: string;
};

type food = {
  foodId: number;
  foodName: string;
  brandName: string;
  foodIntake: number;
  foodCalories: number;
  carbohydrate: number;
  sugars: number;
  dietaryFiber: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
};

export type formProps = {
  food: food;
  buttonName?: string;
  category?: string;
  foodId?: number;
};
