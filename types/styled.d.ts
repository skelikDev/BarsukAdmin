import { theme } from '../src/app/theme';
import type { CSSProp } from 'styled-components';
import 'styled-components';

type BaseThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends BaseThemeType {
  }
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}