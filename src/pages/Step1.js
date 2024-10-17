import React ,{useEffect,useState,useRef} from 'react';
import Step1CustomerPersonalData from '../components/Step1CustomerPersonalData';
import { Button  } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const  Step1 =() =>{

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format to be use to initialize the date on calender
     // State to manage the active step
     const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep ? parseInt(savedStep, 10) : 0;
    });
    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
      }, [activeStep]);
      
      // Initializing state variables
    const dependantCount = useRef(0);
    const [checkedAddProductItems, setCheckedAddProductItems] = useState({
        evacuationRepatriation: false,
        lastExpense: false,
        medical: false,
        hospitalCash: false,
        personalAccident: false,
      });

      useEffect(() => {
        getDependantData();
    
        // Function to get data from localStorage
        const getStep1Data = (key) => {
            const step1DataString = localStorage.getItem('step1');
            if (step1DataString) {
                try {
                    const step1Data = JSON.parse(step1DataString);
                    return step1Data && step1Data.hasOwnProperty(key) ? step1Data[key] || {} : {};
                } catch (error) {
                    console.error('Error parsing JSON from localStorage', error);
                }
            }
            return {};
        };
    
        // Extracting data for each product
        const evacuationRepatriationData = getStep1Data('evacuationRepatriation');
        const lastExpenseData = getStep1Data('lastExpense');
        const medicalData = getStep1Data('medical');
        const hospitalCashData = getStep1Data('hospitalCash');
        const personalAccidentData = getStep1Data('personalAccident');
    
        // Access specific values, defaulting to 0 if not present
        const evacuationCount = evacuationRepatriationData.dependantCount || 0;
        const lastExpenseCount = lastExpenseData.dependantCount || 0;
        const medicalCount = medicalData.dependantCount || 0;
        const hospitalCashCount = hospitalCashData.dependantCount || 0;
        const personalAccidentCount = personalAccidentData.dependantCount || 0;
    
        // Update checkedAddProductItems based on the presence of data
        setCheckedAddProductItems({
            evacuationRepatriation: !!evacuationRepatriationData.dependantCount,  // True if data is present
            lastExpense: !!lastExpenseData.dependantCount,  // True if data is present
            medical: !!medicalData.dependantCount,  // True if data is present
            hospitalCash: !!hospitalCashData.dependantCount,  // True if data is present
            personalAccident: !!personalAccidentData.dependantCount  // True if data is present
        });
    
        // Find the maximum dependantCount
        const maxDependantCount = Math.max(evacuationCount, lastExpenseCount, medicalCount, hospitalCashCount, personalAccidentCount);
        
        // Initializing Dependant Count
        dependantCount.current = maxDependantCount;
    
    }, []);  // Use an empty dependency array if this should run only once
    

    
  const savedStep2Data = JSON.parse(localStorage.getItem('step2')) || {};
            // Extarct Functionality of Product
            const savedFormDataStep1CustomerPersonalDetails = savedStep2Data || {
                policyNumberHolder:'',
                title:'',
                firstName:'',
                middleName:'',
                surname:'',
                dob:'',
                gender:'',
                nationality:'',
                countryofResidence:'',
                nationalIDPassportNo:'',
                nhif:'', 
                pin:'',
                employer:'',
                postalAddress:'',
                code:'', 
                town:'', 
                occupation:'',
                physicalAddress:'', 
                mobileNo: '',
                otherPhone:'',
                email:''
            }
             
      
        //    update The active checked product
        const [formDataStep1CustomerPersonalDetails, setFormDataStep1CustomerPersonalDetails] =useState(savedFormDataStep1CustomerPersonalDetails);

   const [dependantPersonalData, setDependantPersonalData] = useState(null);
     
      
       // State for validation errors step2
     const [errorsStep2CustomerDetails, setErrorsStep2CustomerDetails] = useState({})

    

      const validateStep = () => {
        // Reset errors
        let tempErrorsStep2CustomerDetails = {};

        //  Step 2 Form validations
        if(activeStep === 1){
            // Validation Customer Details
            if (!formDataStep1CustomerPersonalDetails.title) tempErrorsStep2CustomerDetails.title = 'Title Selection is required.';
            if (!formDataStep1CustomerPersonalDetails.firstName) tempErrorsStep2CustomerDetails.firstName= 'First Name is required.';
            if (!formDataStep1CustomerPersonalDetails.surname) tempErrorsStep2CustomerDetails.surname= 'Surname  is required.';
            if (!formDataStep1CustomerPersonalDetails.dob) tempErrorsStep2CustomerDetails.dob= 'Date Of Birth  is required.';
            if (!formDataStep1CustomerPersonalDetails.gender) tempErrorsStep2CustomerDetails.gender= 'Select Gender  is required.';
            if (!formDataStep1CustomerPersonalDetails.nationality) tempErrorsStep2CustomerDetails.nationality= 'Select Nationality  is required.';
            if (!formDataStep1CustomerPersonalDetails.countryofResidence) tempErrorsStep2CustomerDetails.countryofResidence= 'Select Country Residence  is required.';
            if (!formDataStep1CustomerPersonalDetails.nationalIDPassportNo) tempErrorsStep2CustomerDetails.nationalIDPassportNo= 'National ID or Passport No.  is required.';
            if (!formDataStep1CustomerPersonalDetails.town) tempErrorsStep2CustomerDetails.town= 'Town is required.';
            if (!formDataStep1CustomerPersonalDetails.mobileNo) tempErrorsStep2CustomerDetails.mobileNo= 'Mobile Number is required.';
            if (!formDataStep1CustomerPersonalDetails.email) tempErrorsStep2CustomerDetails.email= 'Email is required.';
        }
            setErrorsStep2CustomerDetails(tempErrorsStep2CustomerDetails);
            return ((Object.keys(tempErrorsStep2CustomerDetails).length === 0) );
        };

           // Handle next button click
           const handleNext = () => {
            // Validation logic
            if (validateStep()) {
                if (activeStep === 1) {
                  // Fetch existing data from localStorage (if available)
                  const existingData = JSON.parse(localStorage.getItem('step2')) || {};
                  const existingDependants = existingData.dependantPersonalData || [];
              
                  // Incoming new dependant data
                  const newDependants = dependantPersonalData;
              
                  // Function to merge dependants
                  const mergeDependants = (existingDependants, newDependants) => {
                    // Create a map of existing dependants by dependantNo for quick lookup
                    const existingMap = existingDependants.reduce((acc, dependant) => {
                      acc[dependant.dependantNo] = dependant;
                      return acc;
                    }, {});
              
                    // Loop through new dependants and merge them with existing ones
                    const mergedDependants = newDependants.map(newDependant => {
                      const existingDependant = existingMap[newDependant.dependantNo];
              
                      if (existingDependant) {
                        // Merge the existing dependant with the new one, preserving fields like productMedical
                        return {
                          ...existingDependant, // Preserve existing fields
                          ...newDependant, // Override with new data
                          productMedical: {
                            ...existingDependant.productMedical, // Preserve existing medical conditions
                            ...newDependant.productMedical // Override or merge new medical conditions if provided
                          }
                        };
                      } else {
                        // If no matching dependant exists, simply return the new dependant
                        return newDependant;
                      }
                    });
              
                    return mergedDependants;
                  };
              
                  // Perform the merging of dependants
                  const mergedDependants = mergeDependants(existingDependants, newDependants);
              
                  // Creating the customerDetailsData object
                  const customerDetailsData = {
                    policyNumberHolder:formDataStep1CustomerPersonalDetails.policyNumberHolder,
                    title: formDataStep1CustomerPersonalDetails.title,
                    firstName: formDataStep1CustomerPersonalDetails.firstName,
                    middleName: formDataStep1CustomerPersonalDetails.middleName,
                    surname: formDataStep1CustomerPersonalDetails.surname,
                    dob: formDataStep1CustomerPersonalDetails.dob,
                    gender: formDataStep1CustomerPersonalDetails.gender,
                    nationality: formDataStep1CustomerPersonalDetails.nationality,
                    countryofResidence: formDataStep1CustomerPersonalDetails.countryofResidence,
                    nationalIDPassportNo: formDataStep1CustomerPersonalDetails.nationalIDPassportNo,
                    nhif: formDataStep1CustomerPersonalDetails.nhif,
                    pin: formDataStep1CustomerPersonalDetails.pin,
                    employer: formDataStep1CustomerPersonalDetails.employer,
                    postalAddress: formDataStep1CustomerPersonalDetails.postalAddress,
                    code: formDataStep1CustomerPersonalDetails.code,
                    town: formDataStep1CustomerPersonalDetails.town,
                    occupation: formDataStep1CustomerPersonalDetails.occupation,
                    physicalAddress: formDataStep1CustomerPersonalDetails.physicalAddress,
                    mobileNo: formDataStep1CustomerPersonalDetails.mobileNo,
                    otherPhone: formDataStep1CustomerPersonalDetails.otherPhone,
                    email: formDataStep1CustomerPersonalDetails.email,
                    
                    // Use the merged dependantPersonalData
                    dependantPersonalData: mergedDependants
                  };
              
                  // Merge the existing data with the new customerDetailsData
                  const updatedData = {
                    ...existingData, // Keeps existing data that isn't overwritten
                    ...customerDetailsData // Overrides existing fields with new data
                  };
                  // Clear
                  localStorage.removeItem('step2');
                  // Store the updated data back to localStorage
                  localStorage.setItem('step2', JSON.stringify(updatedData));
                }
              
                // Process to the next page
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              
                // Reload the page (if needed)
                window.location.reload();
              }
              
              

             }

            // Handle back button click
            const handleBack = () => {
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
                window.location.reload();

            };
                    
            const getDependantData = (DependantDetailsStep1) => {
                setDependantPersonalData(DependantDetailsStep1)
            };

           

    return (
        <>
           <Step1CustomerPersonalData 
                today={today}
                formDataStep1CustomerPersonalDetails={formDataStep1CustomerPersonalDetails}
                setFormDataStep1CustomerPersonalDetails ={setFormDataStep1CustomerPersonalDetails}
                errors={errorsStep2CustomerDetails}
                setErrors={setErrorsStep2CustomerDetails}
                dependantCount={dependantCount.current}
                getDependantData={getDependantData}
                checkedAddProductItemsEvacuationRepatriation={checkedAddProductItems.evacuationRepatriation}
                checkedAddProductItemsLastExpense={checkedAddProductItems.lastExpense}
                checkedAddProductItemsMedical={checkedAddProductItems.medical}
                checkedAddProductItemsHospitalCash={checkedAddProductItems.hospitalCash}
                checkedAddProductItemsPersonalAccident={checkedAddProductItems.personalAccident}
           />
           
           <div className="flex flex-col items-center mb-4 ">
                <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    <Button
                    startIcon ={<KeyboardDoubleArrowLeftIcon/>}
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
                    onClick={activeStep === 6 - 1 ? handleNext : handleNext}
                    fullWidth
                    >
                    {activeStep === 6 - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
        </div>
        </>
    )
}


export default Step1;