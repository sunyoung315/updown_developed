import theme from '@/styles/theme';
import iconPaths from '@/styles/icon';

export interface tokenState {
  checkToken: boolean;
  setCheckToken: (checkToken: boolean) => void;
}

export interface Diet {
  dietId: number;
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  dietImg: string;
  totalCalories: number;
  isFast: boolean;
}

export type dateProps = {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

type diet = {
  dietId?: number;
  category?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  dietImg?: string;
  totalCalories?: number;
  isFast?: boolean;
};

export type dietProps = {
  diet?: diet;
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  regDate?: string;
  fast: boolean;
  setFast: (value: boolean) => void;
};

export type foodInfo = {
  foodId: number;
  foodName: string;
  brandName?: string;
  foodIntake?: number;
  calories?: number;
  method?: boolean;
};

type commonProps = {
  type: 'diet' | 'exercise';
  setRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
  category?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  dietId?: number;
  recentWeight?: number;
};

type dietCommonProps = commonProps & {
  type: 'diet';
  info: foodInfo;
};

type exerciseCommonProps = commonProps & {
  type: 'exercise';
  info: Exercise;
};

export type boxProps = dietCommonProps | exerciseCommonProps;

export type buttonProps = {
  buttonName?: string;
  onClick?: () => void;
  color: keyof typeof theme;
  size?: number;
  radius?: number;
  dir?: 'top' | 'bottom';
  textColor?: keyof typeof theme;
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
  name?: string;
  step?: number;
  signup?: boolean;
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
  doSearch?: () => void;
  nutrition?: nutritionProps;
  mypage?: boolean;
  logout?: () => Promise<void>;
  isFixed?: boolean;
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

export type foodResult = {
  foodInfoId?: number;
  foodInfoName?: string;
  brandName?: string;
  foodInfoCalories?: number;
  carbohydrate?: number;
  sugars?: number;
  dietaryFiber?: number;
  protein?: number;
  fat?: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  potassium?: number;
};

export type exerciseResult = {
  exerciseInfoId?: number;
  exerciseName?: string;
  met?: number;
};

// type에 따른 조건부 타입 지정
type commonResultProps = {
  type: 'diet' | 'exercise';
};

type dietSearchResultProps = commonResultProps & {
  type: 'diet';
  result: foodResult;
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  dietId: number;
  exerciseRef?: React.MutableRefObject<exerciseResult>;
  openModal?: () => void;
};

type exerciseSearchResultProps = commonResultProps & {
  type: 'exercise';
  result: exerciseResult;
  category?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  dietId?: number;
  exerciseRef: React.MutableRefObject<exerciseResult>;
  openModal: () => void;
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
  size?: boolean;
  unitdir?: boolean;
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
  category?: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  foodId?: number;
};

export type bottomSheetProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  noModal?: boolean;
  signup?: boolean;
};

export type Member = {
  gender: '남성' | '여성' | '';
  age: number;
  height: number;
  nowWeight: number;
  targetWeight: number;
  activeLevel: '거의없음' | '적음' | '보통' | '많음' | '매우많음' | '';
  targetCalories: number;
  recentWeight?: number;
  themeNum?: number;
};

export type pageProps = {
  data: Member;
  setData: React.Dispatch<React.SetStateAction<Member>>;
  next?: boolean;
  setNext?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => Promise<void>;
  targetCalories?: number;
};

export type ExerciseInfo = {
  exerciseRecordId?: number;
  totalTime?: number;
  totalCaloriesBurned?: number;
  exerciseImg?: string;
  recentWeight?: number;
};

export type Exercise = {
  exerciseId?: number;
  exerciseName?: string;
  exerciseTime?: number;
  caloriesBurned?: number;
  method?: boolean;
  met?: number;
  setList?: ExerciseSet[];
};

export type ExerciseSet = {
  exerciseSetId?: number | null;
  exerciseCount?: number;
  exerciseWeight?: number;
  exerciseDistance?: number;
};

export type WeightInfo = {
  weight: number;
  regDate: string;
};

export type formExProps = {
  exerciseTime: number;
  setExerciseTime: React.Dispatch<React.SetStateAction<number>>;
  caloriesBurned: number;
  setCaloriesBurned?: React.Dispatch<React.SetStateAction<number>>;
  detailType: string;
  setDetailType: React.Dispatch<React.SetStateAction<string>>;
  setList: ExerciseSet[];
  setSetList: React.Dispatch<React.SetStateAction<ExerciseSet[]>>;
};

export type monthProps = {
  selectedMonth: number;
  changeMonth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
};

export type buttonRadioProps = {
  type: string;
  changeType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export type calendarHeaderProps = {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

export type calendarProps = {
  year: number;
  month: number;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  dateList: string[];
};

export type DayInfo = {
  date: string;
  month: string;
  day: string;
};

type commonBoxProps = {
  type: 'diet' | 'exercise' | 'weight';
};

type dietCalendarProps = commonBoxProps & {
  type: 'diet';
  selectedInfo: {
    dietId: number;
    category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
    totalCalories: number;
    regDate: string;
    foodList: {
      foodId: number;
      foodName: string;
      foodIntake: number;
      calories: number;
    }[];
  };
};

type exerciseCalendarProps = commonBoxProps & {
  type: 'exercise';
  selectedInfo: {
    exerciseInfoId: number;
    exerciseName: string;
    exerciseTime: number;
    caloriesBurned: number;
    regDate: string;
    setList: {
      exerciseSetId: number;
      exerciseCount: number;
      exerciseWeight: number;
      exerciseDistance: number;
    }[];
  };
};

type weightCalendarProps = commonBoxProps & {
  type: 'weight';
  selectedInfo: {
    weightId: number;
    weight: number;
    targetWeight: number;
    regDate: string;
  };
};

export type calendarBoxProps =
  | dietCalendarProps
  | exerciseCalendarProps
  | weightCalendarProps;

export type CalendarDiet = {
  dietId: number;
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  totalCalories: number;
  regDate: string;
  foodList: foodInfo[];
};

export type CalendarExercise = {
  exerciseId: number;
  exerciseName: string;
  exerciseTime: number;
  caloriesBurned: number;
  regDate: string;
  setList: ExerciseSet[];
};

export type CalendarWeight = {
  weightId: number;
  weight: number;
  targetWeight: number;
  regDate: string;
};

export type SummaryInfo = {
  dietTotalCalories: number;
  totalCarbohydrate: number;
  totalProtein: number;
  totalFat: number;
  targetCalories: number;
  totalCaloriesBurned: number;
  themeNum: number;
};

export type modalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
};

export type themeProps = {
  name: string;
  imgName: string;
  backgroundColor: keyof typeof theme;
  color: keyof typeof theme;
  isSelected: boolean;
  idx: number;
  setSelectedTheme: React.Dispatch<React.SetStateAction<number>>;
};
