import '@emotion/react'

type ColorsName =
    'slate' |
    'gray' |
    'zinc' |
    'neutral' |
    'stone' |
    'red' |
    'orange' |
    'amber' |
    'yellow' |
    'lime' |
    'green' |
    'emerald' |
    'teal' |
    'cyan' |
    'sky' |
    'blue' |
    'indigo' |
    'violet' |
    'purple' |
    'fuchsia' |
    'pink' |
    'rose'

declare module '@emotion/react' {
    export interface Theme {
        colors: Record<ColorsName, {
            50: string
            100: string
            200: string
            300: string
            400: string
            500: string
            600: string
            700: string
            800: string
            900: string
            950: string
        }>,
        typography: {
            fontFamily: {
                sans: string,
                serif: string,
                mono: string
            }
            fontSize: {
                xs: string,
                sm: string,
                base: string,
                lg: string,
                xl: string,
                '2xl': string,
                '3xl': string,
                '4xl': string,
                '5xl': string,
                '6xl': string,
            }
            fontWeight: {
                thin: number,
                light: number,
                regular: number,
                medium: number,
                bold: number,
                black: number,
            }
            lineHeight: {
                normal: number,
                none: number,
                tight: number,
                snug: number,
                relaxed: number,
                loose: number,
            }
            letterSpacing: {
                tighter: string,
                tight: string,
                normal: string,
                wide: string,
                wider: string,
                widest: string,
            }
        },
        space: {
            px: string,
            0: string,
            1: string,
            2: string,
            3: string,
            4: string,
            5: string,
            6: string,
            8: string,
            10: string,
            12: string,
            16: string,
            20: string,
            24: string,
            32: string,
            40: string,
            48: string,
            56: string,
            64: string,
        },
        dimensions: {
            maxWidth: {
                xs: string,
                sm: string,
                md: string,
                lg: string,
                xl: string,
                '2xl': string,
                '3xl': string,
                '4xl': string,
                '5xl': string,
                full: string,
            },
            width: {
                auto: string,
                full: string,
                screen: string,
            },
            height: {
                auto: string,
                full: string,
                screen: string,
            },
        },
        breakpoints: {
            sm: string,
            md: string,
            lg: string,
            xl: string,
            '2xl': string,
        },
        borderRadius: {
            none: string,
            sm: string,
            base: string,
            md: string,
            lg: string,
            xl: string,
            '2xl': string,
            full: string,
        },
        shadows: {
            sm: string,
            base: string,
            md: string,
            lg: string,
            xl: string,
        },
        zIndex: {
            auto: string,
            0: number,
            10: number,
            20: number,
            30: number,
            40: number,
            50: number,
            above: number,
        },
        opacity: {
            0: string,
            20: string,
            40: string,
            60: string,
            80: string,
            100: string,
        },
    }
}