import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import Step0 from './pages/Step0';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import Step5 from './pages/Step5';
// css home
import './Home.css';
// Example steps for the Stepper component
const steps = ['Product Selection', 'Personal Data', 'Proposer History', 'Policy Summary', 'Payment', 'Policy Issuance'];

const App = () => {
  // Initialize state with value from localStorage or default to 0
  const [activeStep] = useState(() => {
    const savedStep = localStorage.getItem('activeStep');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('activeStep', activeStep);
  }, [activeStep]);

 

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
          <Step0 />
          </>
        );
      case 1:
        return (
          <>
          <Step1 />
          </>
        );
      case 2:
        return (
          <>
          <Step2 />
          </>
        );
      case 3:
        return (
          <>
          <Step3 />
          </>
        );
      case 4:
        return (
          <>
          <Step4 />
          </>
        );
      case 5:
        return (
          <>
          <Step5 />
          </>
        );
      default:  <>  <Step0 />  </>;
    }
  };

  return (
    <div>
      <style>
        {`
          .shadow-div { background-color: white; box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 16px; }
          .logoImage { width: 12%; height: auto; object-fit: contain; display: block; margin: 0; }
        `}
      </style>
      <div style={{ backgroundColor: '#E42D2C' }} className='p-1'></div>
      <div className='shadow-div mb-1'>
        <img className='logoImage' src="images/logo.jpeg" alt="Logo" />
      </div>

      <div style={{ backgroundColor: '#157EBC' }} className="flex bg-blue-900 p-3 overflow-x-hidden">
        <div className="container mx-auto flex items-center justify-center bg-opacity-70">
          <div className="flex flex-col items-center space-y-4 text-white">
            <div style={{ width: '100%', maxWidth: '100%' }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step
                    key={label}
                    sx={{
                      "& .MuiStepLabel-root .Mui-completed": { color: "#ffffff" },
                      "& .MuiStepLabel-root .Mui-active": { color: "#ffffff" },
                      "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": { color: "#ffffff" },
                      "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": { fill: "gray" }
                    }}
                  >
                    <StepLabel
                      sx={{
                        // Make font size responsive for step labels
                        '& .MuiStepLabel-label': {
                          fontSize: { xs: '0.70rem', sm: '1rem' },  // Adjust font size for small screens
                        },
                        '& .MuiStepLabel-root': {
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                        },
                        '& .MuiStepLabel-root .Mui-completed': { color: 'secondary.dark' },
                        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                          color: 'grey.500',
                          fontSize: { xs: '0.75rem', sm: '1rem' },
                        },
                        '& .MuiStepLabel-root .Mui-active': { color: 'secondary.main' },
                        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                          color: 'common.white',
                          fontSize: { xs: '0.70rem', sm: '1rem' },  // Adjust font size for active steps
                        },
                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                          fill: { xs: 'white', sm: 'black' },
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
      </div>
      {renderStepContent(activeStep)}

    </div>
  );
};

export default App;
