import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Step3PolicyEvacuationRepatriation from '../components/Step3PolicyEvacuationRepatriation';
import Step3PolicySummarylastExpense from '../components/Step3PolicySummarylastExpense';
import Step3PolicySummaryMedical from '../components/Step3PolicySummaryMedical';
import Step3PolicySummaryHospitalCash from '../components/Step3PolicySummaryHospitalCash';
import Step3PolicySummaryPersonalAccident from '../components/Step3PolicySummaryPersonalAccident';
import TermsAndConditions from '../components/TermsAndConditions';
const Step3 = () => {
    const [openTermsAndConditions , setOpenTermsAndConditions] = useState(false);

    
    
    const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [paymentCurrencyType, setPaymentCurrencyType] = useState();


    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
        const data = JSON.parse(localStorage.getItem('QuotationData'));

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

    }, [activeStep,setPaymentCurrencyType]);

    const data = JSON.parse(localStorage.getItem('QuotationData'));
   

    const evacuationRepatriationActive = data?.evacuationRepatriation?.isActive;
    const lastExpenseActive = data?.lastExpense?.isActive;
    const medicalActive = data?.medical?.isActive;
    const hospitalCashActive = data?.hospitalCash?.isActive;
    const personalAccidentActive = data?.personalAccident?.isActive;

    const [evacuationRepatriationtotalPremium, setEvacuationRepatriationtotalPremium] = useState();
    const [lastExpenseTotalPremium, setLastExpenseTotalPremium] = useState();
    const [medicalTotalPremium, setMedicalTotalPremium] = useState();
    const [hospitalCashTotalPremium, setHospitalCashTotalPremium] = useState();
    const [personalAccidentTotalPremium, setPersonalAccidentTotalPremium] = useState();


    const saveProcessedPayement = () =>{
        const data = JSON.parse(localStorage.getItem('QuotationData'));

        data.processedPayment = {
            evacuationRepatriationTotalPremium: evacuationRepatriationtotalPremium || 0,
            lastExpenseTotalPremium: lastExpenseTotalPremium || 0,
            medicalTotalPremium: medicalTotalPremium || 0,
            hospitalCashTotalPremium: hospitalCashTotalPremium || 0,
            personalAccidentTotalPremium: personalAccidentTotalPremium || 0
        };
    
    
        // Clear local Storage Data
        localStorage.removeItem('QuotationData');
        // Step 4: Save the updated object back to local storage
        localStorage.setItem('QuotationData', JSON.stringify(data));
     
    }


    const handleNext = () => {

        if (acceptedTerms) {
            saveProcessedPayement();
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            window.location.reload();
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.location.reload();
    };


    return (
        <>
            <style>
                {`
                    .shadow-div { background-color: white; box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 16px; }
                `}
            </style>

            {evacuationRepatriationActive && <Step3PolicyEvacuationRepatriation setEvacuationRepatriationtotalPremium={setEvacuationRepatriationtotalPremium} />}
            {lastExpenseActive && <Step3PolicySummarylastExpense setLastExpenseTotalPremium={setLastExpenseTotalPremium} />}
            {medicalActive && <Step3PolicySummaryMedical setMedicalTotalPremium={setMedicalTotalPremium} />}
            {hospitalCashActive && <Step3PolicySummaryHospitalCash setHospitalCashTotalPremium={setHospitalCashTotalPremium} />}
            {personalAccidentActive && <Step3PolicySummaryPersonalAccident setPersonalAccidentTotalPremium={setPersonalAccidentTotalPremium} />}

            <div className="mt-4 shadow-div m-2">
                <h4 className="text-lg font-bold mb-2">Covers Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                 {evacuationRepatriationActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Evacuation And Repatriation</div>
                        <div>{paymentCurrencyType} {Number(evacuationRepatriationtotalPremium).toLocaleString()}</div>
                    </div>
                   }
                   {lastExpenseActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Last Expense</div>
                        <div>{paymentCurrencyType} {Number(lastExpenseTotalPremium).toLocaleString()}</div>
                    </div>
                    }
                   {medicalActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Medical</div>
                        <div>{paymentCurrencyType} {Number(medicalTotalPremium).toLocaleString()}</div>
                    </div>
                    }
                  {hospitalCashActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Hospital Cash</div>
                        <div>{paymentCurrencyType} {Number(hospitalCashTotalPremium).toLocaleString()}</div>
                    </div>
                    }
                   {personalAccidentActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Personal Accident</div>
                        <div>{paymentCurrencyType} {Number(personalAccidentTotalPremium).toLocaleString()}</div>
                    </div>
                     }
                </div>

                <div className="flex justify-end mt-4">
                    <h4 className="text-lg font-bold">
                        Total Premium: {paymentCurrencyType} {Number(
                        (evacuationRepatriationtotalPremium || 0) +
                        (lastExpenseTotalPremium || 0) +
                        (medicalTotalPremium || 0) +
                        (hospitalCashTotalPremium || 0) +
                        (personalAccidentTotalPremium || 0)
                        ).toLocaleString()}
                    </h4>
                    </div>


                <div className="mt-4 text-sm">* Premiums are based on the selected plan and coverage types</div>

                {/* Terms and conditions section */}
                <div className="flex flex-col items-center justify-center mt-4">
                    <FormControlLabel
                        control={<Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />}
                        label={
                            <span>
                                I accept the{' '}
                                
                                <Button  onClick={() => { setOpenTermsAndConditions(true); }}>
                                terms and conditions
                                </Button>

                                {openTermsAndConditions  &&
                                <>   
                                          
                                  <TermsAndConditions setOpenTermsAndConditions={setOpenTermsAndConditions} />
                                </>
 
                                }
                            </span>
                        }
                    />
                </div>
            </div>

            <div className="flex flex-col items-center mb-4">
                <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <Button
                        startIcon={<KeyboardDoubleArrowLeftIcon />}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        style={{ marginRight: 8 }}
                        fullWidth
                    >
                        Back
                    </Button>
                    <Button
                        endIcon={<DoubleArrowIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        fullWidth
                        disabled={!acceptedTerms} // Disable the button until terms are accepted
                    >
                        {activeStep === 6 - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Step3;
