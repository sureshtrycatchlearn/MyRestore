import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from "./LoadingComponent";
import { fetchBaskeAsync } from "../../feature/basket/basketSlice";
import { Outlet, useLocation } from "react-router-dom";
import { fetchCurrentUser } from "../../feature/Account/accountSlice";
import { useAppDispatch } from "../store/configureStore";
import HomePage from "../../feature/home/HomePage";


function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

 const initApp = useCallback(async ()=> {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBaskeAsync());
    } catch (error) {
      console.log(error);
    }
  },[dispatch])

  useEffect(()=> {
    initApp().then(()=>setLoading(false))
  }, [initApp])

const [darkMode, setDarkMode]=useState(false);
const paletteType = darkMode? 'dark':'light'
  const theme=createTheme({
    palette:{
      mode:paletteType,
      background:{
        default: paletteType==='light' ? '#eaeaea' : '#121212'
      }
    }
  })

function handleThemeChange(){
  setDarkMode(!darkMode);
}


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handeleThemeChange={handleThemeChange} />
      {
        loading ? <LoadingComponent message="Initializing app....." />
            : location.pathname === '/' ? <HomePage />
            : <Container sx={{mt: 4}}> 
                <Outlet />  
              </Container>
      }
    </ThemeProvider>
      );
  }
  export default App;

