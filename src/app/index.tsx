import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { HomePage } from "../pages/home-page";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  h1 {
    ${theme.typography.h1Tablet};
  }

  h2 {
    ${theme.typography.h2Tablet};
  }

  h3 {
    ${theme.typography.h3Tablet};
  }

  h4 {
    ${theme.typography.h4Tablet};
  }

  h5 {
    ${theme.typography.h5Tablet};
  }

  h6 {
    ${theme.typography.h6Tablet};
  }

  p, span, div {
    ${theme.typography.bodyTablet};
  }

  @media (min-width: 768px) {

    h1 {
      ${theme.typography.h1};
    }

    h2 {
      ${theme.typography.h2};
    }

    h3 {
      ${theme.typography.h3};
    }

    h4 {
      ${theme.typography.h4};
    }

    h5 {
      ${theme.typography.h5};
    }

    h6 {
      ${theme.typography.h6};
    }

    p, span, div {
      ${theme.typography.body};
    }
  }


  body {
    margin: 0;
    padding: 0;
  }
`;

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <HomePage />
      </AppContainer>
      <ToastContainer />
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${theme.colors.background.main};
  color: ${theme.colors.text.main};
`;
