import { Container } from 'react-bootstrap';
import {
  PaymentElement, 
  // AddressElement,
  LinkAuthenticationElement
} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setEmail(_email: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <section className="  ">
    
      <Container className="  " fluid>
     <h1 className="text-dark">Accept a payment</h1>
    <form id="payment-form" onSubmit={handleSubmit}>
    <h3 className="text-dark">Contact info</h3>
        <p className="text-dark">All transactions are secure and encrypted.</p>
      <LinkAuthenticationElement id="link-authentication-element"
        //Access the email value like so:
        onChange={(event) => {
         setEmail(event.value.email);
        }}
        
        //cPrefill the email field like so:
        options={{defaultValues: {email: 'adeyemiemma45@gmail.com'}}}
        />
          {/* <h3>Shipping address</h3>
          <AddressElement
            options={{mode: 'shipping', }}

            // Access the address like so:
            // onChange={(event) => {
            //   setAddressState(event.value);
            // }}
          /> */}
     <h3 className="text-dark">Payment</h3>
      <PaymentElement id="payment-element" />
      <button className="text-dark bg-dark my-2" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner text-dark" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </Container>
    </section>
  )
}