import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import OmyuPretty from '@/assets/fonts/omyupretty.woff';

const GlobalFont = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'omyudapretty';
        src: local('omuydapretty'), url(${OmyuPretty}) format('woff');
    }
`;

export default GlobalFont;
