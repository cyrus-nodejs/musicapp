

import { Row,  Container } from "react-bootstrap";

import {  useEffect } from "react"

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { useAppDispatch } from "../../redux/app/hook";
import { loadStripe } from '@stripe/stripe-js';
import { useAppSelector } from "../../redux/app/hook";
import { fetchCurrentOrder, getClientSecret, getCurrentOrder } from "../../redux/features/checkout/checkoutSlice";

const STRIPE = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
import NavIndex from "../../components/NavBar/NavIndex";
function Payment() {
  
  



const dispatch = useAppDispatch()

const clientSecret = useAppSelector(getClientSecret)

const stripePromise = loadStripe(STRIPE)
  const currentOrder = useAppSelector(getCurrentOrder)



      useEffect(() => {
        dispatch(fetchCurrentOrder())
      
      }, [ dispatch]);
  console.log(clientSecret)
  console.log(stripePromise)
  console.log(currentOrder)
  return (
    <section className="  ">
      
      <Container className="mt-5  " fluid>
       <Row>
        {clientSecret && stripePromise ? ( <div className=" row">
          <div className=" col-7   border-start-0 border-bottom-0" >
        
   
   
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
    
    
    
          </div>
          <div className="border-start  col-5  " >
          
        
           
            <div className="">
        <div className="d-flex mb-3">
 
  <div className="d-flex mb-3">
  <div className="me-auto text-success p-2 ">Package Plan:</div>
  <div className="p-2 text-success">{currentOrder?.pricing.plans}</div>
  
  </div> 
  <div className="d-flex mb-3">
  <div className="me-auto p-2 text-success">Total:</div>
  <div className="p-2 text-success  fw-bold">${currentOrder?.bill}</div>
  </div>
  

    
   
  </div>
    
                  
  </div>           
      
        
        </div>
       
      
        </div>)
         :
         (<div className="p-5">
          <NavIndex />
          <p className="fs-1 text-center text-dark">No order exist</p>
          </div>) }
        
      </Row>
     
      
    </Container>
   </section>
  );
}

export default Payment;