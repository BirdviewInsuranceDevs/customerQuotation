import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


const Step5 = ()=>{
    const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep ? parseInt(savedStep, 10) : 0;
    });


    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
    }, [activeStep]);



    const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            window.location.reload();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.location.reload();
    };


    return(
         <>

         
           
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
                    >
                        {activeStep === 6 - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Step5;