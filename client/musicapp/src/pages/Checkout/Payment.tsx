

import { Row,  Container } from "react-bootstrap";

import {  useEffect } from "react"
import Login from "../Auth/Login";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { useAppDispatch } from "../../redux/app/hook";
import { loadStripe } from '@stripe/stripe-js';
import { useAppSelector } from "../../redux/app/hook";
import { fetchCurrentOrder, getClientSecret, getCurrentOrder } from "../../redux/features/checkout/checkoutSlice";
import {getIsAuthenticated, getAuthUser} from "../../redux/features/auth/authSlice"

import NavIndex from "../../components/NavBar/NavIndex";
function Payment() {
  
  



const dispatch = useAppDispatch()

const clientSecret = useAppSelector(getClientSecret)
const stripe = 'pk_test_51Mps4OAtt6kY2KD5Fk11TyCnr8MKgtAiFawUiZ8pktDZ87ZoMLp1ywccXje9k3QKwYppvh3UDf28XdeQnKMnOvar00r7UZq2FI'
const stripePromise = loadStripe(stripe)
  const currentOrder = useAppSelector(getCurrentOrder)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const authUser = useAppSelector(getAuthUser)


      useEffect(() => {
        dispatch(fetchCurrentOrder())
      
      }, [ dispatch]);
  console.log(clientSecret)
  console.log(stripePromise)
  console.log(currentOrder)
  return (
    <section className="  ">
      
      <Container className="mt-5  " fluid>
       {isAuthenticated && authUser ? ( <Row>
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
        
      </Row>) : (<Login />) }
     
      
    </Container>
   </section>
  );
}

export default Payment;