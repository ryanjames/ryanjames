import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const SGlobal = createGlobalStyle`
  @font-face {
    font-family: "Nacelle";
    src: url("/fonts/Nacelle-Regular.woff2") format("woff2"),
         url("/fonts/Nacelle-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Nacelle";
    src: url("/fonts/Nacelle-Bold.woff2") format("woff2"),
         url("/fonts/Nacelle-Bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Nacelle', system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }
`;