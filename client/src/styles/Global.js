import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

* { 
    font-family: 'Lato', sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    color: #535657;
}

body { 
    background-color: #DEE7E7;
}

`

export default GlobalStyles;