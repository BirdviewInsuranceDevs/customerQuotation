import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Link } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Step3PolicyEvacuationRepatriation from '../components/Step3PolicyEvacuationRepatriation';
import Step3PolicySummarylastExpense from '../components/Step3PolicySummarylastExpense';
import Step3PolicySummaryMedical from '../components/Step3PolicySummaryMedical';
import Step3PolicySummaryHospitalCash from '../components/Step3PolicySummaryHospitalCash';
import Step3PolicySummaryPersonalAccident from '../components/Step3PolicySummaryPersonalAccident';

const Step3 = () => {
    const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
    }, [activeStep]);

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
        const userData = JSON.parse(localStorage.getItem('QuotationData'));
         userData.processedPayment = {
            evacuationRepatriationTotalPremium: evacuationRepatriationtotalPremium, 
            lastExpenseTotalPremium: lastExpenseTotalPremium,
            medicalTotalPremium:medicalTotalPremium,
            hospitalCashTotalPremium: hospitalCashTotalPremium,
            personalAccidentTotalPremium: personalAccidentTotalPremium
        };
    
        // Clear local Storage Data
        localStorage.removeItem('QuotationData');
        // Step 4: Save the updated object back to local storage
        localStorage.setItem('QuotationData', JSON.stringify(userData));
     
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
                        <div>KES {Number(evacuationRepatriationtotalPremium).toLocaleString()}</div>
                    </div>
                   }
                   {lastExpenseActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Last Expense</div>
                        <div>KES {Number(lastExpenseTotalPremium).toLocaleString()}</div>
                    </div>
                    }
                   {medicalActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Medical</div>
                        <div>KES {Number(medicalTotalPremium).toLocaleString()}</div>
                    </div>
                    }
                  {hospitalCashActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Hospital Cash</div>
                        <div>KES {Number(hospitalCashTotalPremium).toLocaleString()}</div>
                    </div>
                    }
                   {personalAccidentActive &&
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Personal Accident</div>
                        <div>KES {Number(personalAccidentTotalPremium).toLocaleString()}</div>
                    </div>
                     }
                </div>

                <div className="flex justify-end mt-4">
                    <h4 className="text-lg font-bold">Total Premium: KES {Number(evacuationRepatriationtotalPremium + lastExpenseTotalPremium + medicalTotalPremium + hospitalCashTotalPremium + personalAccidentTotalPremium).toLocaleString()}</h4>
                </div>

                <div className="mt-4 text-sm">* Premiums are based on the selected plan and coverage types</div>

                {/* Terms and conditions section */}
                <div className="flex flex-col items-center justify-center mt-4">
                    <FormControlLabel
                        control={<Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />}
                        label={
                            <span>
                                I accept the{' '}
                                <Link href="/terms-and-conditions" target="_blank" className="text-blue-500 underline">
                                    terms and conditions
                                </Link>
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
