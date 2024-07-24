import { BrowserRouter } from "react-router-dom"
import MainRoutes from "./routes/mainRoutes"
import ScrollToTop from './utils/ScrollToTop'
import { AuthProvider } from "./context/authContext"
import { useSelector } from "react-redux"
import { CssBaseline, GlobalStyles, ThemeProvider, createTheme } from "@mui/material"
import { themeSettings } from "./theme"
import { useMemo } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {

  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              '@global': {
                'html, body, #root': {
                  height: '100%',
                  width: '100%',

                },
              },
              '*::-webkit-scrollbar': {
                width: '0.5rem'
              },
              '*::-webkit-scrollbar-track': {
                'WebkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[300],
                borderRadius:' 100px',
                '&:hover':{
                  backgroundColor:theme.palette.grey[500]
                }
              }

            }}
          />
          <ScrollToTop />
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
