import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    #root {
        font-family: "omyudapretty";
    }
    * {
        box-sizing: border-box;
        margin: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    ol, ul {
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "omyudapretty";
    }
`;

export default GlobalStyle;
