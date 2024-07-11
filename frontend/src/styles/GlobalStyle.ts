import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    #root {
        font-family: "omyudapretty";
    }
    * {
        box-sizing: border-box;
        margin: 0;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
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
    input {
        font-family: "omyudapretty";
        border: 0;
        background: transparent;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        color: ${theme.grey};
    }
`;

export default GlobalStyle;
