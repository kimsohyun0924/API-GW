import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --default-bg-color: #ffffff;
    --main-bg-color: #fafbfc;
    --sidebar-bg-color: #f4f4f4;
    --sidebar-focus-bgcolor: #ffffff; // #efefef
    --sidebar-focus-color: #0052cc;  
    --text-basic-color: #222222;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;  
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    line-height: 1.5;
    background: var(--default-bg-color);
    box-sizing: border-box;
  }

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export default GlobalStyle;