import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    #root {
        font-family: "omyudapretty";
        font-size: 1.13rem;
        color: ${theme.black};
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
    .swal2-popup {
        font-family: "omyudapretty";
        width: 70%;
        max-width: 380px;
        padding-top: 1rem;
        margin-top: 2rem;
    }
    .swal2-popup.swal2-toast .swal2-html-container {
        margin: 0.5em;
        padding: 0;
        overflow: initial;
        font-size: 1em;
        text-align: initial;
    }
    .swal2-icon {
        margin: 0 auto;
    }
`;

export default GlobalStyle;
