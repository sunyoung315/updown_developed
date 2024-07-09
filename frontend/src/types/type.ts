import theme from '@/styles/theme';
import iconPaths from '@/styles/icon';

export interface tokenState {
  checkToken: boolean;
  setCheckToken: (checkToken: boolean) => void;
}

export interface Diet {
  dietId: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dietImg: string;
  totalCalories: number;
  isFast: boolean;
}

export type dateProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

type diet = {
  dietId?: number;
  category?: string;
  dietImg?: string;
  totalCalories?: number;
  isFast?: boolean;
};

export type dietProps = {
  diet?: diet;
  category: string;
  regDate?: string;
};

export type foodInfo = {
  foodId: number;
  foodName: string;
  brandName?: string;
  foodIntake?: number;
  calories?: number;
  method?: boolean;
};

export type exerciseInfo = {
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
  setIsDelted: React.Dispatch<React.SetStateAction<boolean>>;
  dietId?: number;
  category?: string;
};

type dietCommonProps = commonProps & {
  type: 'diet';
  info: foodInfo;
};

type exerciseCommonProps = commonProps & {
  type: 'exercise';
  info: exerciseInfo;
};

export type boxProps = dietCommonProps | exerciseCommonProps;

export type buttonProps = {
  buttonName?: string;
  onClick?: () => void;
  color: keyof typeof theme;
  size?: number;
  radius?: number;
};

export type inputProps = {
  inputDir?: string;
  inputType?: string;
  inputName?: string;
  inputNameColor?: keyof typeof theme;
  placeholder?: string;
  isRequired?: boolean;
  starColor?: keyof typeof theme;
  unit?: string;
  onChange: React.Dispatch<React.SetStateAction<any>>;
  value?: string | number;
  isBig?: boolean;
};

export type nutritionProps = {
  totalFoodIntake: number;
  totalCalories: number;
  totalCarbohydrate: number;
  totalDietaryFiber: number;
  totalSugars: number;
  totalProtein: number;
  totalFat: number;
  totalSaturatedFat: number;
  totalTransFat: number;
  totalCholesterol: number;
  totalSodium: number;
  totalPotassium: number;
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
  nutrition?: nutritionProps;
};

export type iconButtonProps = {
  iconName: keyof typeof iconPaths;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: number;
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
  dietId?: number;
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
  ntr?: boolean;
};

export type food = {
  foodId?: number;
  foodName: string;
  brandName: string;
  foodIntake: number;
  calories: number;
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

export type bottomSheetProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
};
