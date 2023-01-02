import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../feature/about/AboutPage";
import Catalog from "../../feature/catalog/Catalog";
import ProductDetails from "../../feature/catalog/ProductDetails";
import ContactPage from "../../feature/contact/ContactPage";
import HomePage from "../../feature/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css'
import serverError from "../errors/serverError";
import NotFound from "../errors/NotFound";
import basketPage from "../../feature/basket/basketPage";
import { useStoreContext } from "../context/storeContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../feature/checkout/CheckoutPage";





function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const buyerId = getCookie('buyerId')
    if(buyerId) {
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    } else 
    {
      setLoading(false);
    }
  }, [setBasket])

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

function handeleThemeChange(){
  setDarkMode(!darkMode);
}

if(loading) return  <LoadingComponent message="Initializing app....."></LoadingComponent>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline/>
      <Header darkMode={darkMode} handeleThemeChange={handeleThemeChange}/>
      <Container>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/catalog' component={Catalog}/>
        <Route path='/catalog/:id' component={ProductDetails}/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/contact' component={ContactPage}/>
        <Route path='/server-error' component={serverError}/>
        <Route path='/basket' component={basketPage}/>
        <Route path='/checkout' component={CheckoutPage}/>
        <Route component={NotFound}/>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;

