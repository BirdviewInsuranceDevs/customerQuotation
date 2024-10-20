import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Step5PolicyDodument from '../components/Step5PolicyDodument';

const Step5 = () => {

    const processState = "download";
    const buttonName = "Download Policy Document";
    const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
    }, [activeStep]);

    const handleNext = () => {
        // Errase All localstorage data from Browser
        localStorage.clear();
        window.location.replace("https://birdviewmicroinsurance.com");

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.location.reload();
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-md shadow-md my-8">
                <h2 className="text-xl font-semibold mb-2 text-center">Thank You!</h2>
                <p className="text-center">
                    Thank you for your purchase! You have successfully paid the amount for your cover. 
                    Your policy document is ready for download. Please click the red download button below to 
                    obtain your policy document.
                </p>
                <div className="mt-4"> {/* Add some margin above the button */}
                   <Step5PolicyDodument processState={processState} buttonName={buttonName} />
                </div>
            </div>
     
            <div className="flex flex-col items-center mb-4">
                <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <Button
                        startIcon={<KeyboardDoubleArrowLeftIcon />}
                        disabled={true}
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
                    >
                        {activeStep === 6 - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Step5;
