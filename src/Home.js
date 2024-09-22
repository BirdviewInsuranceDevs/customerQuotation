import React, { useState, useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import { Stepper, Step, StepLabel } from '@mui/material';
import Step0 from './pages/Step0';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';

// Example steps for the Stepper component
const steps = ['Product Selection', 'Personal Data', 'Medical History', 'Policy Summary', 'Payment', 'Policy Issuance'];

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
          <div>
            <Typography>Review your details and policy summary.</Typography>
            {/* Include a summary of the collected data here */}
          </div>
        );
      case 4:
        return (
          <div>
            <TextField
              label="Payment Method"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Payment Details"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </div>
        );
      case 5:
        return (
          <div>
            <Typography>Your policy has been issued successfully!</Typography>
            {/* Include policy issuance confirmation details here */}
          </div>
        );
      default:
        return <div>Unknown step</div>;
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
      <div style={{ backgroundColor: '#E42D2C' }} className='p-4'></div>
      <div className='shadow-div mb-2'>
        <img className='logoImage' src="images/logo.jpeg" alt="Logo" />
      </div>

      <div style={{ backgroundColor: '#157EBC' }} className="flex bg-blue-900 p-3">
        <div className="container mx-auto flex items-center justify-center bg-opacity-70">
          <div className="flex flex-col items-center space-y-4 text-white">
            <div style={{ width: '100%', maxWidth: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step   key={label}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "#ffffff"
                    },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "#ffffff"
                    },
                     
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                      color: "#ffffff"
                    },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "gray"
                    }
                  }}
                  >
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-root': {   flexDirection: { xs: 'column', sm: 'row' },   alignItems: { xs: 'flex-start', sm: 'center' },  
                        },
                        '& .MuiStepLabel-root .Mui-completed': {  color: 'secondary.dark', 
                        },
                        '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                          color: 'grey.500',  
                          fontSize: { xs: '0.75rem', sm: '1rem' },  
                        },
                        '& .MuiStepLabel-root .Mui-active': {
                          color: 'secondary.main', 
                        },
                        '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {  color: 'common.white',  fontSize: { xs: '0.75rem', sm: '1rem' },  
                        },
                        '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {  fill: { xs: 'white', sm: 'black' },  
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
