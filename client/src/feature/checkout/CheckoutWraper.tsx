import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51MgPpFDk3odOYYaNiYNQA7gE4ZzoppISqgiEZ5kDWrZZDsuAqAQ1mBmg6mm159O8psLgcprSqbIVqoP2OPwQZOB600SDI4xmSN');

export default function CheckoutWraper(){
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        agent.Payments.createPaymentIntent()
             .then(basket=>dispatch(setBasket(basket)))
             .catch(error=>console.log(error))
             .finally(()=>setLoading(false))
    },[dispatch])

    if(loading) return <LoadingComponent message="Loading Checkout....." />
    
    return(
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}