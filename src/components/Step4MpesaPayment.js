import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button,  Box, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactlessIcon from '@mui/icons-material/Contactless';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

const stripePromise = loadStripe('pk_live_51P334dP4gOFYkAZTUNU0csa9aViBujvMEY5sIxTQI2ilyBeuFH6hlyMSyH3UCEf7co0Ocvt8fiVoU1JPNe8zSi6Y00CEz72w1a');

const CheckoutForm = () => {
  const [amount] = useState(100); // Amount in cents
  const [processing, setProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success'); // 'success' or 'error'
  const [alertMessage, setAlertMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [progress, setProgress] = useState(0); // progress percentage
  const stripe = useStripe();
  const elements = useElements();

  const [activeStep, setActiveStep] = useState(() => {
    const savedStep = localStorage.getItem('activeStep');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  
  useEffect(() => {
    localStorage.setItem('activeStep', activeStep);
  }, [activeStep]);

  useEffect(() => {
    let interval;
    if (isCompleted && progress < 100) {
      interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 20)); // Increase progress every second
      }, 1000);
    } else if (progress >= 100) {
      clearInterval(interval);
      setShowTerms(true);
    }
    return () => clearInterval(interval);
  }, [isCompleted, progress]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);

    try {
      // 1. Create the PaymentIntent on your server
      const response = await fetch('https://api.stripe.birdviewinsurance.com/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error(`Server response error: ${response.statusText}`);
      }

      const { clientSecret } = await response.json();

      if (typeof clientSecret !== 'string' || !clientSecret) {
        throw new Error('Invalid clientSecret received.');
      }

      // 2. Confirm the payment, which may trigger 3D Secure
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3. Handle error during payment confirmation (including 3D Secure failures)
      if (stripeError) {
        setAlertType('error');
        setAlertMessage(stripeError.message);
        setOpen(true);
      } else {
        // 4. Check if additional authentication (3D Secure) is required
        if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
          setAlertType('info');
          setAlertMessage('Additional authentication is required. Please complete the authentication process.');
          setOpen(true);
        } else if (paymentIntent.status === 'succeeded') {
          // 5. Handle successful payment (after 3D Secure, if needed)
          setAlertType('success');
          setAlertMessage('Payment successful!');
          setOpen(true);
          setIsCompleted(true);
        } else {
          setAlertType('warning');
          setAlertMessage('Payment was not successful.');
          setOpen(true);
        }
      }
    } catch (err) {
      setAlertType('error');
      setAlertMessage('Payment failed: ' + err.message);
      setOpen(true);
    } finally {
      setProcessing(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const cardElementStyle = {
    base: {
      iconColor: '#32325d',
      color: '#32325d',
      fontWeight: 400,
      fontSize: '16px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      iconColor: '#fa755a',
      color: '#fa755a',
    },
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center  p-4 bg-gray-100">
      {!isCompleted ? (
      <form  autoComplete="off" onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto space-y-6">
      <div className="flex items-center space-x-3 justify-center mb-4">
        <PaymentIcon className="h-10 w-10 text-blue-500"    sx={{color: '#157EBC'}} />
        <h2 className="text-2xl font-bold text-gray-800">Pay Mpesa</h2>
      </div>
      <p className="text-center text-gray-500">Securely pay using your credit or debit card.</p>
      
      {/* Amount to be paid */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-sm">
        <p className="text-gray-600 text-sm">Amount to be paid:</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-medium text-gray-800">$</span>
          <span className="text-4xl font-bold text-gray-900">{(amount / 100).toFixed(2)}</span>
        </div>
      </div>
      
      {/* Card details section */}
      <div className="mb-4 mt-4">
        <p className="text-gray-700 text-lg font-semibold mb-2">Card Details</p>
        <p className="text-gray-500 text-xs mb-4">Enter your card information to complete the payment.</p>
        <CardElement options={{ style: cardElementStyle }} />
      </div>

      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<ContactlessIcon />}
        className={`w-full py-3 px-6 mt-4 rounded-lg text-white font-bold transition-transform transform ${
          processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        } hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        disabled={!stripe || processing}
      >
        {processing ? 'Processing...' : 'Pay'}
      </Button>
    </form>
     
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          {progress < 100 ? (
            <>
            <h2 className="text-2xl font-bold mb-4">Processing...</h2>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress variant="determinate" value={progress} />
              <Box
                sx={{  top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex',  alignItems: 'center',  justifyContent: 'center',  }}  >
                <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>{`${Math.round(progress)}%`}</Typography>
              </Box>
            </Box>
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-26 w-26 text-green-500 mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-4">Transaction Complete</h2>
              <p className="text-gray-600 mb-4">Amount: ${amount / 100}</p>
              {showTerms && (
                <div className='justify-center'>
                  <div className="mt-4">
                    <Button
                      variant="contained"
                      onClick={handleNext}
                     
                      
                    >
                      Proceed
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      )}

      
      {/* Snackbar for success and error messages */}
      <Snackbar open={open} autoHideDuration={10000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertType} variant="filled" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};



const Step4StripePayment = () => {
  return (
    <>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </>
  );
};

export default Step4StripePayment;  