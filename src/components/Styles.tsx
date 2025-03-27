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
    src: url("/fonts/Nacelle-Light.woff2") format("woff2"),
         url("/fonts/Nacelle-Light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Nacelle";
    src: url("/fonts/Nacelle-Bold.woff2") format("woff2"),
         url("/fonts/Nacelle-Bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
  }

    @font-face {
    font-family: "SF Mono";
    src: url("/fonts/LigaSFMonoNerdFont-Light.woff2") format("woff2"),
         url("/fonts/LigaSFMonoNerdFont-Light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  .header-bar {
    transition: all 0.5s ease-in-out;
    .about & {
      border-color: #ffffff;
    }
  }

  body {
    transition: all 0.5s ease-in-out;
    overscroll-behavior: none;
    font-family: 'Nacelle', system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    background-color: #ffffff;
    color: #101214;
    a, a:active, a:hover, a:visited {
      color: #101214;
      text-decoration: none;
    }
  }
  &.about {
    color: #ffffff;
    background-color: #101214;
    a, a:active, a:hover, a:visited {
      color: #ffffff;
    }
  }
`;