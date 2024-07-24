export const tokensDark = {
    grey: {
        0: "#ffffff",
        10: "#f7f7f7",
        20: '#f1f1f1',
        30: '#FAFAFA',
        50: "#FEFAFE",
        80: "#f0f0f0",
        100: "#D9D9D9",
        150: '#cccccc',
        200: "#c2c2c2",
        250: "#1A1A1A",
        300: "#a3a3a3",
        400: "#808080",
        500: "#666666",
        600: "#4d4d4d",
        700: "#404040",
        800: "#292929",
        900: "#141414",
        1000: "#000000",
    },

    primary: {
        100: '#a1c9ff',
        200: "#66A7FF",
        250: 'F4F7FB',
        300: '#d1e5ff',
        400: "#006BFA",
        700: "#3533CD",
        800: '#4365A7',
        900: "#302F62",
        1000: '#344054'
    },
}

function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObj = {};
        for (let i = 0; i < length; i++) {
            reversedObj[keys[i]] = values[length - i - 1];
        }
        reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    primary: {
                        ...tokensDark.grey,
                        main: tokensDark.grey[800],
                        light: tokensDark.grey[300],
                    },

                    secondary: {
                        ...tokensDark.grey,
                        main: tokensDark.grey[0],
                        profile: tokensDark.grey[700],
                        tab: tokensDark.grey[0],
                        text: tokensDark.grey[0],
                        view: tokensDark.grey[0],
                        border: tokensDark.grey[500],
                        settingIcon: tokensDark.grey[0]
                        

                    },

                    neutral: {
                        ...tokensDark.grey,
                        main: tokensDark.primary[400],
                        light: tokensDark.grey[80]
                    },
                    background: {
                        default: tokensDark.grey[800],
                        alt: tokensDark.grey[100],
                        dark: tokensDark.grey[0],
                        msg: tokensDark.grey[250],
                        setting: tokensDark.grey[700],
                        settingList: tokensDark.grey[600]
                    },

                } : {
                    primary: {
                        ...tokensLight.primary,
                        main: tokensDark.primary[400],
                        light: tokensDark.primary[400],
                    },
                    secondary: {
                        ...tokensDark.grey,
                        main: tokensDark.grey[800],
                        profile: tokensDark.grey[80],
                        tab: tokensDark.primary[400],
                        text: tokensDark.grey[400],
                        view: tokensDark.primary[800],
                        border: tokensDark.grey[150],
                        settingIcon: tokensDark.primary[1000]
                        

                    },

                    neutral: {
                        ...tokensLight.grey,
                        main: tokensDark.primary[400],
                        light: tokensDark.grey[80]

                    },
                    background: {
                        default: tokensDark.grey[0],
                        alt: tokensDark.grey[10],
                        dark: tokensDark.grey[800],
                        msg: tokensDark.primary[300],
                        setting: tokensDark.grey[30],
                        settingList: tokensDark.grey[0],

                    },
                })
        },
        components: {
            mode: mode,
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: mode === 'dark' ? tokensDark.grey[800] : tokensDark.grey[0]
                    }
                }
            },


            MuiTypography: {
                styleOverrides: {
                    root: {
                        fontFamily: 'SF Pro Display, sans-serif',
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    // root: {
                    //   backgroundColor: "#fff",

                    // },
                    input: {
                        fontFamily: 'SF Pro Display, sans-serif',
                    },
                    // notchedOutline: {
                    //   border:'none',
                    //   borderRadius:'2px',
                    //   borderBottom:'1px solid #CCC',
                    // }
                }
            }
        }
    }
}