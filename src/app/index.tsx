import { Loyalty } from '../widgets/loyalty';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Loyalty/>
            </AppContainer>
        </ThemeProvider>
    )
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${({theme}) => {
    return theme.colors.slate['950'];
  }};
  color: ${({theme}) => {
    return theme.colors.gray['50'];
  }};
}
`;
