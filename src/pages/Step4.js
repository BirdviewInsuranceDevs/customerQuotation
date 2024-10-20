import React, { useEffect, useState } from 'react';
import { Button, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Step4StripePayment from '../components/Step4StripePayment';
import { Alert } from '@mui/material'; 


const Step4 = () => {
  const [activeStep, setActiveStep] = useState(() => {
    const savedStep = localStorage.getItem('activeStep');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isPaymentScreenVisible, setIsPaymentScreenVisible] = useState(false);
  const [paymentSuccess,SetPaymentSuccess]  = useState(false);
  
 
  const [evacuationRepatriationtotalPremium, setEvacuationRepatriationtotalPremium] = useState();
  const [lastExpenseTotalPremium, setLastExpenseTotalPremium] = useState();
  const [medicalTotalPremium, setMedicalTotalPremium] = useState();
  const [hospitalCashTotalPremium, setHospitalCashTotalPremium] = useState();
  const [personalAccidentTotalPremium, setPersonalAccidentTotalPremium] = useState();
  const [paymentCurrencyType, setPaymentCurrencyType] = useState();




  useEffect(() => {
    localStorage.setItem('activeStep', activeStep);
    const data = JSON.parse(localStorage.getItem('QuotationData'));
     // initialize Sub total payment
    setEvacuationRepatriationtotalPremium(data?.processedPayment.evacuationRepatriationTotalPremium);
    setLastExpenseTotalPremium(data?.processedPayment.lastExpenseTotalPremium);
    setMedicalTotalPremium(data?.processedPayment.medicalTotalPremium);
    setHospitalCashTotalPremium(data?.processedPayment.hospitalCashTotalPremium);
    setPersonalAccidentTotalPremium(data?.processedPayment.personalAccidentTotalPremium);

    // Check the currency type and assign the appropriate symbol
    const currencySymbol = (currency) => {
      switch (currency) {
          case 'KES':
          return 'Ksh.';
          case 'USD':
          return '$';
          case 'EUR':
          return '€';
          case 'GBP':
          return '£';
          default:
          return 'Ksh.';  
      }
      };

      // Use the currency check before setting the payment currency type
      const currencyType = currencySymbol(data?.contactAndCurrencyData?.currency);
      setPaymentCurrencyType(currencyType);
    
  }, [activeStep,
    setPaymentCurrencyType,
    setEvacuationRepatriationtotalPremium,
    setLastExpenseTotalPremium,
    setMedicalTotalPremium,
    setHospitalCashTotalPremium,
    setPersonalAccidentTotalPremium,
  ]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.location.reload();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.location.reload();
  };

  const handlePayment = () => {
    if (selectedPaymentMethod) {
      setIsPaymentScreenVisible(true);
    }
  };

  // Premiums data
  const premiums = [
    { name: 'Evacuation and Repatriation', amount: evacuationRepatriationtotalPremium  },
    { name: 'Last Expense', amount: lastExpenseTotalPremium },
    { name: 'Medical', amount: medicalTotalPremium  },
    { name: 'Hospital Cash', amount: hospitalCashTotalPremium  },
    { name: 'Personal Accident', amount: personalAccidentTotalPremium  },
  ];

  return (
    <>
      {/* Payment Screen */}
      {isPaymentScreenVisible && (
       <Step4StripePayment SetPaymentSuccess ={SetPaymentSuccess} />
      )}

      {/* Initial Content (Hidden after Pay is clicked) */}
      {!isPaymentScreenVisible && (
        <div className='shadow-xl flex flex-col sm:flex-row justify-between p-6 bg-white rounded-lg space-y-4 sm:space-y-0 sm:space-x-4'>
          {/* Left section for premium summary */}
          <div className='w-full sm:w-1/2 p-4'>
            <h3 className='text-lg font-bold mb-4'>Premium Summary</h3>

            {premiums
              .filter((premium) => premium.amount != null && premium.amount !== 0) // Ensure the amount is not null/undefined and not zero
              .map((premium, index) => (
                <div key={index} className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200"> {/* Added pb-3 for padding and border-b for bottom border */}
                  <p className="text-gray-700">{premium.name}</p>
                  <span className="text-gray-900">
                    {premium.amount ? premium.amount.toLocaleString() : 'N/A'} {/* Display 'N/A' if amount is undefined */}
                  </span>
                </div>
              ))}

            <div className='flex justify-between items-center font-bold text-xl'>
              <p>Total</p>
              <span>
                {paymentCurrencyType}{' '}
                         {Number(
                        (evacuationRepatriationtotalPremium || 0) +
                        (lastExpenseTotalPremium || 0) +
                        (medicalTotalPremium || 0) +
                        (hospitalCashTotalPremium || 0) +
                        (personalAccidentTotalPremium || 0)
                        ).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right section for payment method */}
          <div className='w-full sm:w-1/2 p-4'>
            <h3 className='text-lg font-bold mb-4'>Payment Method</h3>

            <FormControl fullWidth variant="outlined" className='mb-6'>
              <InputLabel id="payment-method-label">Select Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                label="Select Payment Method"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <MenuItem disabled={paymentCurrencyType === 'Ksh.'} value="Stripe">Stripe</MenuItem>
                <MenuItem disabled={paymentCurrencyType === 'Ksh.'} value="Pesa-Pal">Pesa-Pal</MenuItem>
                <MenuItem disabled={paymentCurrencyType !== 'Ksh.'} value="Mpesa">Mpesa</MenuItem>
              </Select>
              {!selectedPaymentMethod && (
                <FormHelperText sx={{ fontSize: '0.75rem', color: 'error.main' }}>
                    <Alert severity="info">
                    Please select Payment Method
                    </Alert>
                </FormHelperText>
              )} 
            </FormControl>

            <div className='flex justify-center mt-8'>
              <Button
                variant="contained"
                sx={{
                    backgroundColor: 'red',  
                    color: '#ffffff', 
                    '&:hover': {
                        backgroundColor: 'darkred', 
                    },
                }}
                onClick={handlePayment}
                disabled={!selectedPaymentMethod}
              >
                Procced pay 
              </Button>
            </div>
          </div>
        </div>
      )}

        
      {/* Navigation Buttons */}
      <div className="flex flex-col items-center mb-4">
        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <Button
            startIcon={<KeyboardDoubleArrowLeftIcon />}
            onClick={handleBack}
            fullWidth
            disabled={paymentSuccess}
          >
            Back
          </Button>
          <Button
            endIcon={<DoubleArrowIcon />}
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={true} 
            fullWidth
          >
            {activeStep === 6 - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>


    </>
  );
};

export default Step4;
