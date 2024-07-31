import { themeProps } from '@/types/type';

const theme = {
  lightred: '#F6A3A3',
  red: '#CC6363',
  white: '#FFFEFC',
  pink: '#F4BFC5',
  darkpink: '#DE8791',
  yellow: '#FBDD6B',
  orange: '#F4B24E',
  lightgreen: '#E4F5E3',
  green: '#B8DEB5',
  darkgreen: '#7FA17D',
  skyblue: '#A4CCD6',
  blue: '#6298A5',
  bordergrey: '#EEEEEE',
  lightgrey: '#F6F6F6',
  grey: '#B7B7B7',
  darkgrey: '#242424',
  black: '#262626',
  transparent: 'transparent',
  lightpurple: '#DEBEE1',
  purple: '#AC81B0',
  lightcobalt: '#B9CBFA',
  cobalt: '#6C8EE3',
  lightcoral: '#F9A88F',
  coral: '#F4764E',
  lightemerald: '#ACE3A8',
  emerald: '#83C65B',
};

export default theme;

export const themeList = [
  {
    name: '운동냥이',
    imgName: 'bodybuilder-cat',
    backgroundColor: 'pink',
    color: 'darkpink',
  },
  {
    name: '집냥이',
    imgName: 'house-cat',
    backgroundColor: 'lightpurple',
    color: 'purple',
  },
  {
    name: '흥냥이',
    imgName: 'music-cat',
    backgroundColor: 'lightcobalt',
    color: 'cobalt',
  },
  {
    name: '명상냥이',
    imgName: 'yoga-cat',
    backgroundColor: 'lightred',
    color: 'red',
  },
  {
    name: '꽃냥이',
    imgName: 'flower-cat',
    backgroundColor: 'lightcoral',
    color: 'coral',
  },
  {
    name: '휴식냥이',
    imgName: 'rest-cat',
    backgroundColor: 'lightemerald',
    color: 'emerald',
  },
] as themeProps[];
