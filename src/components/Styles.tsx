import { createGlobalStyle } from "styled-components";
import type { TStyles } from "../types";

export const styles: TStyles = {
  type: {
    sans: `'Nacelle', system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
    mono: `"SF Mono", "Menlo", "Consolas", "Liberation Mono", "Courier New", monospace`,
  },
  colors: {
    black: "rgb(16, 18, 20)",
    white: "rgb(255, 255, 255)",
    active: "rgb(0, 112, 243)",
  },
  measurements: {
    workNavWidth: 300,
    desktopMargin: 32,
  }
}

styles.colors.offBlack = styles.colors.black.replace("rgb", "rgba").replace(")", ", 0.2)");

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
      border-color: ${styles.colors.white};
    }
  }

  body {
    transition: all 0.5s ease-in-out;
    overscroll-behavior: none;
    font-family: ${styles.type.sans};
    font-weight: 300;
    background-color: ${styles.colors.white};
    color: ${styles.colors.black};
    a, a:active, a:hover, a:visited {
      color: ${styles.colors.black};
      text-decoration: none;
    }
  }
  &.about {
    color: ${styles.colors.white};
    background-color: ${styles.colors.black};
    a, a:active, a:hover, a:visited {
      color: ${styles.colors.white};
    }
  }
`;