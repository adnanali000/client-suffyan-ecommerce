import React from 'react'
import { Divider, Typography, Button } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep,backStep, onCaptureCheckout,shippingData,timeout}) => {

  const handleSubmit = async (event) => {
    event.preventDefault();
      const orderData =  {
        line_items: checkoutToken.live.line_items,
        checkoutToken:checkoutToken.id,
        customer: {firstname:shippingData.firstName, lastname:shippingData.lastName, email:shippingData.email},
        shipping: {
          name:'Primary',
          street:shippingData.address, 
          town_city: shippingData.city,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {shipping_method: shippingData.shippingOption},
      }

      onCaptureCheckout(orderData)
      // timeout()
      nextStep();
    // }
  }
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e)}>
              {/* <CardElement />  */}
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="contained" color="primary">
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
