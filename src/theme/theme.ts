import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Noto Sans JP',
            'sans-serif',
        ].join(',')
    },
    palette: {
        primary: {
            main: '#06C755',
            light: '#DFF9E2', // LINEの緑色の薄い色
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#1E2832', // 濃い紺色（ボタンの色）
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#66bb6a', // 背景を緑色に
            paper: '#FFFFFF', // カードなどの背景を白に
        },
        text: {
            primary: '#FFFFFF', // メインテキストを白に
            secondary: '#1E2832', // セカンダリーテキストを濃い色に
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // ボタンの角を少し丸く
                },
                containedSecondary: {
                    backgroundColor: '#1E2832', // セカンダリーボタンの背景色
                    color: '#FFFFFF', // セカンダリーボタンのテキスト色
                    '&:hover': {
                        backgroundColor: '#2C3E50', // ホバー時の色
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16, // カードの角を丸く
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // 軽いシャドウを追加
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: {
                    fontWeight: 700, // タイトルを太字に
                },
                body1: {
                    fontSize: '1rem', // 本文のフォントサイズを調整
                },
            },
        },
    },
});

export default theme;