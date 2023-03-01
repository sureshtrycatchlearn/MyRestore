
import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutPage from "../../feature/about/AboutPage";
import Login from "../../feature/Account/Login";
import Register from "../../feature/Account/Register";
import BasketPage from "../../feature/basket/basketPage";
import Catalog from "../../feature/catalog/Catalog";
import ProductDetails from "../../feature/catalog/ProductDetails";
import CheckoutPage from "../../feature/checkout/CheckoutPage";
import CheckoutWraper from "../../feature/checkout/CheckoutWraper";
import ContactPage from "../../feature/contact/ContactPage";
import HomePage from "../../feature/home/HomePage";
import Orders from "../../feature/orders/Orders";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/serverError";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutWraper />},
                {path: 'orders', element: <Orders />},
            ]},
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <Navigate replace to='/not-found' />},

        ]
}])