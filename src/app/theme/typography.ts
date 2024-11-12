import { css } from 'styled-components';

const fontFamily = {
  sans: '"Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, serif',
  mono: 'Menlo, monospace',
};

const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
};

const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
};

const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

export const typography = {
  fontFamily,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,

  h1: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes['6xl']}; // 60px
    font-weight: ${fontWeights.bold};
    line-height: ${lineHeights.tight}; // 1.25
    letter-spacing: ${letterSpacings.tight};
    margin: 0; // Сброс отступов по умолчанию
  `,

  h2: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes['5xl']}; // 48px
    font-weight: ${fontWeights.bold};
    line-height: ${lineHeights.tight}; // 1.25
    letter-spacing: ${letterSpacings.tight};
    margin: 0;
  `,

  h3: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes['4xl']}; // 36px
    font-weight: ${fontWeights.semiBold};
    line-height: ${lineHeights.snug}; // 1.375
    letter-spacing: ${letterSpacings.normal};
    margin: 0;
  `,

  h4: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes['3xl']}; // 30px
    font-weight: ${fontWeights.semiBold};
    line-height: ${lineHeights.snug}; // 1.375
    letter-spacing: ${letterSpacings.normal};
    margin: 0;
  `,

  h5: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes['2xl']}; // 24px
    font-weight: ${fontWeights.medium};
    line-height: ${lineHeights.normal}; // 1.5
    letter-spacing: ${letterSpacings.normal};
    margin: 0;
  `,

  h6: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes.xl}; // 20px
    font-weight: ${fontWeights.medium};
    line-height: ${lineHeights.normal}; // 1.5
    letter-spacing: ${letterSpacings.normal};
    margin: 0;
  `,

  body: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes.base}; // 16px
    font-weight: ${fontWeights.normal};
    line-height: ${lineHeights.relaxed}; // 1.625
    letter-spacing: ${letterSpacings.normal};
    margin: 0;
  `,

  small: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes.sm}; // 14px
    font-weight: ${fontWeights.normal};
    line-height: ${lineHeights.normal}; // 1.5
    letter-spacing: ${letterSpacings.normal};
    margin: 0;
  `,

  caption: css`
    font-family: ${fontFamily.sans};
    font-size: ${fontSizes.xs}; // 12px
    font-weight: ${fontWeights.normal};
    line-height: ${lineHeights.snug}; // 1.375
    letter-spacing: ${letterSpacings.normal};
    margin: 0;
  `,
};
