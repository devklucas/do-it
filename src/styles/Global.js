import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        padding:0;
        margin:0;
        box-sizing: border-box;
        outline:0;
    }
    :root{
        --white:#f5f5f5;
        --vanilha:#f1ede0;
        --black: #0c0d0d;
        --orange:#c85311;
        --gray:#666360;
        --red:#c53030;
    }
    body{
        background: var(--vanilha);
        color: var(--black);
    }
    body, input, button{
        font-family: "PT Serif", serif;
        font-size: 1rem;
    }
    h1,h2,h3,h4,h5,h6{
        font-family: "Roboto Mono", monospace;
        font-weight: 700;
    }
    button{
        cursor:pointer;
    }
    a{
        text-decoration:none;
    }

`