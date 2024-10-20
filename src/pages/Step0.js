import React, { useState,useEffect,useRef} from 'react';
import { Button, TextField } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel ,Checkbox,FormControlLabel  } from '@mui/material';
import Step0EvacuationRepatriation  from '../components/Step0EvacuationRepatriation'; 
import Step0LastExpense  from '../components/Step0LastExpense';
import Step0Medical  from '../components/Step0Medical';
import Step0HospitalCash from '../components/Step0HospitalCash';
import Step0PersonalAccident from '../components/Step0PersonalAccident';
import { Alert } from '@mui/material'; 
import dayjs from 'dayjs';  
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Snackbar from '@mui/material/Snackbar';
 

const Step0 = () => {
      // State to manage the active step
       const [activeStep, setActiveStep] = useState(() => {
            const savedStep = localStorage.getItem('activeStep');
            return savedStep ? parseInt(savedStep, 10) : 0;
        });
        useEffect(() => {
            localStorage.setItem('activeStep', activeStep);
          }, [activeStep]);
        
          const today = new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format to be use to initialize the date on calender
            // State for form inputs Evacuation & Repatriation
            const savedStep1Data = JSON.parse(localStorage.getItem('step1')) || {};
            // Extarct Functionality of Product
            const savedCheckedAddProductItems = savedStep1Data.checkedAddProductItems || {
                evacuationRepatriation: false,
                lastExpense: false,
                medical: false,
                hospitalCash: false,
                personalAccident: false
            }
      
        //    update The active checked product
        const [checkedAddProductItems, setCheckedAddProductItems] =useState(savedCheckedAddProductItems);

      const isAnyProductSelected = () => {
        return Object.values(checkedAddProductItems).some(value => value === true);
      };
      
      // Function to map ProductID to state
      const setProductState = (productId) => {
        const productMapping = {
          1: 'evacuationRepatriation',
          2: 'lastExpense',
          3: 'medical',
          4: 'hospitalCash',
          5: 'personalAccident',
        }; 
      const productKey = productMapping[productId];
        if (productKey) {
          setCheckedAddProductItems((prevCheckedAddProductItems) => ({
            ...prevCheckedAddProductItems,
            [productKey]: true,
          }));
        }
      };

      // Parse ProductID from URL and set state
      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('ProductID'), 10);
        if (productId && !isNaN(productId)) {
          setProductState(productId);
        }
      }, []);

      // Define a function to handle checkbox changes
      const handleCheckboxAddProduct = (event) => {
        const { name, checked } = event.target;
        setCheckedAddProductItems((prevCheckedAddProductItems) => ({
          ...prevCheckedAddProductItems,
          [name]: checked,
        }));
      };


      // convertion Rates
      const conversionRates = {
        KES: 1,
        USD: 0.0073,
        EUR: 0.0066,
        GBP: 0.0057,
      };
  
      // Define the product options and summary data
        const EvacuationRepatriationPlans = [
          { id: 1, plan: 'Plan 1', coverAmount: '100000', premium: '2310', itl: '4.62', pcf: '5.00', total: '2,319.62' },
          { id: 2, plan: 'Plan 2', coverAmount: '200000', premium: '3850', itl: '7.70', pcf: '9.00', total: '3,866.70' },
          { id: 3, plan: 'Plan 3', coverAmount: '300000', premium: '4620', itl: '9.24', pcf: '11.00', total: '4,640.24' },
          { id: 4, plan: 'Plan 4', coverAmount: '500000', premium: '7700', itl: '15.40', pcf: '18.00', total: '7,733.40' }
        ];

      // Define the product options for LastExpense
        const LastExpensePlans = [
          { id: 9, plan: 'Plan 1', coverAmount: '50000', premium: '30000', itl: '0.60', pcf: '0.50', total: '301.10' },
          { id: 10, plan: 'Plan 2', coverAmount: '100000', premium: '60000', itl: '1.20', pcf: '1.00', total: '602.20' },
          { id: 11, plan: 'Plan 3', coverAmount: '200000', premium: '1200', itl: '2.40', pcf: '2.00', total: '1,204.40' },
          { id: 12, plan: 'Plan 4', coverAmount: '250000', premium: '1570', itl: '3.14', pcf: '2.50', total: '1,575.64' },
          { id: 13, plan: 'Plan 5', coverAmount: '300000', premium: '1890', itl: '3.78', pcf: '3.00', total: '1,896.78' },
          { id: 14, plan: 'Plan 6', coverAmount: '500000', premium: '3140', itl: '6.28', pcf: '5.00', total: '3,151.28' }
        ];

      // Define the product options for Medical
      const MedicalPlans = [
        // Inpatient Plans
        { id: 21, plan: 'Plan 1', benefit: 'Inpatient', coverType: 'Individual', coverAmount: '200000', premium: '4000', itl: '8.00', pcf: '10.00', total: '4018.00' },
        { id: 25, plan: 'Plan 2', benefit: 'Inpatient', coverType: 'Individual', coverAmount: '300000', premium: '5000', itl: '8.00', pcf: '10.00', total: '5018.00' },
        { id: 29, plan: 'Plan 3', benefit: 'Inpatient', coverType: 'Individual', coverAmount: '500000', premium: '6000', itl: '8.00', pcf: '10.00', total: '6018.00' },
        
        // Outpatient Plans
        { id: 22, plan: 'Plan 1', benefit: 'Outpatient', coverType: 'Individual', coverAmount: '50000', premium: '8580', itl: '8.00', pcf: '10.00', total: '8598.00' },
        
        // Dental Plans
        { id: 23, plan: 'Plan 1', benefit: 'Dental', coverType: 'Individual', coverAmount: '5000', premium: '1080', itl: '8.00', pcf: '10.00', total: '1098.00' },
        { id: 27, plan: 'Plan 2', benefit: 'Dental', coverType: 'Individual', coverAmount: '7500', premium: '1610', itl: '8.00', pcf: '10.00', total: '1628.00' },
        { id: 31, plan: 'Plan 3', benefit: 'Dental', coverType: 'Individual', coverAmount: '10000', premium: '2150', itl: '8.00', pcf: '10.00', total: '2168.00' },

        // Optical Plans
        { id: 24, plan: 'Plan 1', benefit: 'Optical', coverType: 'Individual', coverAmount: '5000', premium: '1080', itl: '8.00', pcf: '10.00', total: '1098.00' },
        { id: 28, plan: 'Plan 2', benefit: 'Optical', coverType: 'Individual', coverAmount: '7500', premium: '1610', itl: '8.00', pcf: '10.00', total: '1628.00' },
        { id: 32, plan: 'Plan 3', benefit: 'Optical', coverType: 'Individual', coverAmount: '10000', premium: '2150', itl: '8.00', pcf: '10.00', total: '2168.00' }
      ];

      // Define the product options for Hospital Cash
      const HospitalCashPlans = [
        { id: 45, plan: 'Plan 1', coverAmount: '2000', premium: '930', itl: '2.00', pcf: '1.00', total: '933.00' },
        { id: 46, plan: 'Plan 2', coverAmount: '2500', premium: '1160', itl: '2.50', pcf: '1.20', total: '1,163.70' },
        { id: 47, plan: 'Plan 3', coverAmount: '3000', premium: '1390', itl: '3.00', pcf: '1.50', total: '1,394.50' },
        { id: 48, plan: 'Plan 4', coverAmount: '3500', premium: '1620', itl: '3.50', pcf: '1.80', total: '1,624.30' },
        { id: 49, plan: 'Plan 5', coverAmount: '4000', premium: '1850', itl: '4.00', pcf: '2.00', total: '1,856.00' },
        { id: 50, plan: 'Plan 6', coverAmount: '5000', premium: '2310', itl: '5.00', pcf: '2.50', total: '2,317.50' },
      ];

      // Define the product options for Personal Accident
      const PersonalAccidentPlans = [
        { id: 51, plan: 'Plan 1', coverAmount: '50000', premium: '500', itl: '1.00', pcf: '0.50', total: '501.50' },
        { id: 52, plan: 'Plan 2', coverAmount: '100000', premium: '1000', itl: '2.00', pcf: '1.00', total: '1,003.00' },
        { id: 53, plan: 'Plan 3', coverAmount: '200000', premium: '1340', itl: '2.68', pcf: '1.34', total: '1,344.02' },
        { id: 54, plan: 'Plan 4', coverAmount: '250000', premium: '1670', itl: '3.34', pcf: '1.67', total: '1,674.01' },
        { id: 55, plan: 'Plan 5', coverAmount: '300000', premium: '2000', itl: '4.00', pcf: '2.00', total: '2,006.00' },
        { id: 56, plan: 'Plan 6', coverAmount: '500000', premium: '2500', itl: '5.00', pcf: '2.50', total: '2,507.50' },
      ];


            // Extarct Contact Information for Contact Information
            const savedContactAndLoginsAndCurrency = savedStep1Data.contactAndLoginsAndCurrency || {
            firstName: '',
            currency: 'KES',
            email: '',
            }
                                                                 
            const [contactAndLoginsAndCurrency, setContactAndLoginsAndCurrency] =useState(savedContactAndLoginsAndCurrency);

            // Extract the 'evacuationRepatriation' data from the saved object
            const savedEvacuationRepatriation = savedStep1Data.evacuationRepatriation || {
            currency: 'KES',
            coverType: '',
            policyStartDate: '',
            selectedPlan: null,
            premium: '',
            coverAmount:'',
            };     
                                                               
            // Initialize the state with the evacuation data or default values
            const [formDataStep0EvacuationRepatriation, setFormDataStep0EvacuationRepatriation] = useState(savedEvacuationRepatriation);

            // Last Expense
            const savedLastExpense = savedStep1Data.lastExpense || {
            currency: 'KES',
            coverType: '',
            policyStartDate: '',
            selectedPlan: null,
            premium: '',
            coverAmount:'',
            };
            const [formDataStep0LastExpense, setFormDataStep0LastExpense] = useState(savedLastExpense);

            // Medical
            const savedMedical = savedStep1Data.medical || {
            currency: 'KES',
            coverType: '',
            dependantCount: '',
            policyStartDate: '',
            selectedPlanInpatient:null,
            selectedPlanOutpatient: null,
            selectedPlanDental: null,
            selectedPlanOptical: null,
            premiumInpatient: '',
            premiumOutpatient: '',
            premiumDental: '',
            premiumOptical: '',
            coverAmount:'',
            coverAmountOutpatient:'',
            coverAmountInpatient:'',
            coverAmountDental:'',
            coverAmountOptical:''
            };
            const [formDataStep0Medical, setFormDataStep0Medical] = useState(savedMedical);

            // Hospital Cash
            const savedHospitalCash = savedStep1Data.hospitalCash || {
            currency: 'KES',
            dependantCount: '',
            coverType: '',
            policyStartDate: '',
            selectedPlan: null,
            premium: '',
            coverAmount:'',
            };
            const [formDataStep0HospitalCash, setFormDataStep0HospitalCash] = useState(savedHospitalCash);

            // Personal Accident
            const savedPersonalAccident = savedStep1Data.personalAccident || {
            currency: 'KES',
            coverType: '',
            policyStartDate: '',
            selectedPlan: null,
            premium: '',
            coverAmount:'',
            };
            const [formDataStep0PersonalAccident, setFormDataStep0PersonalAccident] = useState(savedPersonalAccident);
 
                                              
            
            // initialize products errors step1
            const [errorsGeneralProducts, setErrorsGeneralProducts] = useState({});
            const [errorsEvacuationRepatriation, setErrorsEvacuationRepatriation] = useState({});
            const [errorsLastExpense, setErrorsLastExpense] = useState({});
            const [errorsMedical, setErrorsMedical] = useState({});
            const [errorsHospitalCash, setErrorsHospitalCash] = useState({});
            const [errorsPersonalAccident, setErrorsPersonalAccident] = useState({});

            // Alert Snackbar for all Erro Messages
            const [snackbarOpen, setSnackbarOpen] = React.useState(false);
            // Function to handle closing of Snackbar
            const handleCloseSnackbar = (event, reason) => {
              if (reason === 'clickaway') {
                return; // Prevent closing on clickaway if you don't want that behavior
              }
              setSnackbarOpen(false);
            };

       
            
         

            // Validation function for each step
            const validateStep = () => {

            let tempErrorsGeneralProducts = {};
            let tempErrorsEvacuationRepatriation = {};
            let tempErrorsLastExpense = {};
            let tempErrorsMedical = {};
            let tempErrorsHospitalCash = {};
            let tempErrorsPersonalAccident = {};
           
  
              //  Validating for all this general form for all Product
              if (!contactAndLoginsAndCurrency.firstName) tempErrorsGeneralProducts.firstName = 'First Name is required.';
              if (!contactAndLoginsAndCurrency.email) tempErrorsGeneralProducts.email = ' Email is required.';

          // Step 1 validation For Evacuation And Repatriation Forms
          if (activeStep === 0 && checkedAddProductItems.evacuationRepatriation === true ) {
                // Reseting the stored value in Step 0
                step1RefStoredData.current = {};
               if (!formDataStep0EvacuationRepatriation.coverType) tempErrorsEvacuationRepatriation.coverType = 'Cover Type is required.';
               // Date validation
                let formattedPolicyStartDate = formDataStep0EvacuationRepatriation.policyStartDate;
                // Ensure the policyStartDate is not null and is a valid Dayjs object
                if (!formattedPolicyStartDate) {
                // Handle null case
                tempErrorsEvacuationRepatriation.policyStartDate = 'Policy Start Date is required.';
                } else if (!dayjs(formattedPolicyStartDate).isValid()) {
                // Handle invalid date format
                tempErrorsEvacuationRepatriation.policyStartDate = 'Policy Start Date is invalid.';
                } else {
                // Convert to 'YYYY-MM-DD' for comparison
                formattedPolicyStartDate = dayjs(formattedPolicyStartDate).format('YYYY-MM-DD');
                
                // Check if the date is in the past
                if (formattedPolicyStartDate < today) {
                    tempErrorsEvacuationRepatriation.policyStartDate = 'Policy Start Date cannot be in the past.';
                }
                }
              // Selected Plan validation
              if (formDataStep0EvacuationRepatriation.selectedPlan === null ) {
                tempErrorsEvacuationRepatriation.selectedPlan = 'You must select a plan before proceeding.';
              }}
              

          // Step 1 validation For Last Expense Forms
          if (activeStep === 0 && checkedAddProductItems.lastExpense === true ) {
               // Reseting the stored value in Step 0
               step1RefStoredData.current = {};
              if (!formDataStep0LastExpense.coverType) tempErrorsLastExpense.coverType = 'Cover Type is required.';
              // Date validation
              let formattedPolicyStartDate = formDataStep0LastExpense.policyStartDate;
                // Ensure the policyStartDate is not null and is a valid Dayjs object
                if (!formattedPolicyStartDate) {
                // Handle null case
                tempErrorsLastExpense.policyStartDate = 'Policy Start Date is required.';
                } else if (!dayjs(formattedPolicyStartDate).isValid()) {
                // Handle invalid date format
                tempErrorsLastExpense.policyStartDate = 'Policy Start Date is invalid.';
                } else {
                // Convert to 'YYYY-MM-DD' for comparison
                formattedPolicyStartDate = dayjs(formattedPolicyStartDate).format('YYYY-MM-DD');
                
                // Check if the date is in the past
                if (formattedPolicyStartDate < today) {
                    tempErrorsLastExpense.policyStartDate = 'Policy Start Date cannot be in the past.';
                }
                }
             
              // Selected Plan validation
              if (formDataStep0LastExpense.selectedPlan === null ) {
                tempErrorsLastExpense.selectedPlan = 'You must select a plan before proceeding.';
              }}

              


              
           // Step 1 validation For Medical Forms
          if (activeStep === 0 && checkedAddProductItems.medical === true ) {
               // Reseting the stored value in Step 0
               step1RefStoredData.current = {};
              if (!formDataStep0Medical.coverType) tempErrorsMedical.coverType = 'Cover Type is required.';

              if (formDataStep0Medical.dependantCount > 10) tempErrorsMedical.dependantCount = 'Dependant Count should not exceed 10';
              // Check if the dependants count is a number and greater than 0
              if (formDataStep0Medical.dependantCount && (isNaN(formDataStep0Medical.dependantCount) || formDataStep0Medical.dependantCount < 0)) { 
                tempErrorsMedical.dependantCount = 'Dependant Count must be a number greater than 0.';
              }
              let formattedPolicyStartDate = formDataStep0Medical.policyStartDate;

              // Ensure the policyStartDate is not null and is a valid Dayjs object
              if (!formattedPolicyStartDate) {
              // Handle null case
              tempErrorsMedical.policyStartDate = 'Policy Start Date is required.';
              } else if (!dayjs(formattedPolicyStartDate).isValid()) {
              // Handle invalid date format
              tempErrorsMedical.policyStartDate = 'Policy Start Date is invalid.';
              } else {
              // Convert to 'YYYY-MM-DD' for comparison
              formattedPolicyStartDate = dayjs(formattedPolicyStartDate).format('YYYY-MM-DD');
              
              // Check if the date is in the past
              if (formattedPolicyStartDate < today) {
                tempErrorsMedical.policyStartDate = 'Policy Start Date cannot be in the past.';
              }
              }
              
              // Selected Plan validation
              if ( formDataStep0Medical.selectedPlanInpatient === null && formDataStep0Medical.selectedPlanOutpatient === null &&   formDataStep0Medical.selectedPlanDental === null && formDataStep0Medical.selectedPlanOptical ===null  ) {
                tempErrorsMedical.selectedPlan = 'You must select at least one plan before proceeding.';
              } }


                // Step 1 validation For Hospital Cash Forms
          if (activeStep === 0 && checkedAddProductItems.hospitalCash === true ) {
            // Reseting the stored value in Step 0
            step1RefStoredData.current = {};

           if (formDataStep0HospitalCash.coverType === 'per-family' && !formDataStep0HospitalCash.dependantCount) tempErrorsHospitalCash.dependantCount = 'Dependant Count is required for Per-family Cover.';
           // dependents counts should not Exceed 10 
           if (formDataStep0HospitalCash.dependantCount > 10) tempErrorsHospitalCash.dependantCount = 'Dependant Count should not exceed 10';
           // Check if the dependants count is a number and greater than 0
           if (formDataStep0HospitalCash.dependantCount && (isNaN(formDataStep0HospitalCash.dependantCount) || formDataStep0HospitalCash.dependantCount < 0)) { 
            tempErrorsHospitalCash.dependantCount = 'Dependant Count must be a number greater than 0.';
           }

           // Check if the cover type selected, if per-person then set dependant value to 0
           if (formDataStep0HospitalCash.coverType === 'per-person') {
             setFormDataStep0HospitalCash({ ...formDataStep0HospitalCash, dependantCount: 0 });
           }
           if (!formDataStep0HospitalCash.coverType) tempErrorsHospitalCash.coverType = 'Cover Type is required.';

           // Date validation
            let formattedPolicyStartDate = formDataStep0HospitalCash.policyStartDate;

            // Ensure the policyStartDate is not null and is a valid Dayjs object
            if (!formattedPolicyStartDate) {
            // Handle null case
            tempErrorsHospitalCash.policyStartDate = 'Policy Start Date is required.';
            } else if (!dayjs(formattedPolicyStartDate).isValid()) {
            // Handle invalid date format
            tempErrorsHospitalCash.policyStartDate = 'Policy Start Date is invalid.';
            } else {
            // Convert to 'YYYY-MM-DD' for comparison
            formattedPolicyStartDate = dayjs(formattedPolicyStartDate).format('YYYY-MM-DD');
            
            // Check if the date is in the past
            if (formattedPolicyStartDate < today) {
              tempErrorsHospitalCash.policyStartDate = 'Policy Start Date cannot be in the past.';
            }
            }
           // Selected Plan validation
           if (formDataStep0HospitalCash.selectedPlan === null ) {
            tempErrorsHospitalCash.selectedPlan = 'You must select a plan before proceeding.';
           }}


            // Step 1 validation For Personal Accident Forms
          if (activeStep === 0 && checkedAddProductItems.personalAccident === true ) {
            // Reseting the stored value in Step 0
            step1RefStoredData.current = {};
           if (!formDataStep0PersonalAccident.coverType) tempErrorsPersonalAccident.coverType = 'Cover Type is required.';
           // Date validation
           let formattedPolicyStartDate = formDataStep0PersonalAccident.policyStartDate;
           // Ensure the policyStartDate is not null and is a valid Dayjs object
           if (!formattedPolicyStartDate) {
           // Handle null case
           tempErrorsPersonalAccident.policyStartDate = 'Policy Start Date is required.';
           } else if (!dayjs(formattedPolicyStartDate).isValid()) {
           // Handle invalid date format
           tempErrorsPersonalAccident.policyStartDate = 'Policy Start Date is invalid.';
           } else {
           // Convert to 'YYYY-MM-DD' for comparison
           formattedPolicyStartDate = dayjs(formattedPolicyStartDate).format('YYYY-MM-DD');
           
           // Check if the date is in the past
           if (formattedPolicyStartDate < today) {
            tempErrorsPersonalAccident.policyStartDate = 'Policy Start Date cannot be in the past.';
           }
           }

           // Selected Plan validation
           if (formDataStep0PersonalAccident.selectedPlan === null ) {
            tempErrorsPersonalAccident.selectedPlan = 'You must select a plan before proceeding.';
           }}

            setErrorsGeneralProducts(tempErrorsGeneralProducts)
            setErrorsEvacuationRepatriation(tempErrorsEvacuationRepatriation);
            setErrorsLastExpense(tempErrorsLastExpense);
            setErrorsMedical(tempErrorsMedical);
            setErrorsHospitalCash(tempErrorsHospitalCash);
            setErrorsPersonalAccident(tempErrorsPersonalAccident);
 
              if(Object.keys(tempErrorsGeneralProducts).length > 0 || 
               Object.keys(tempErrorsEvacuationRepatriation).length > 0 || 
               Object.keys(tempErrorsLastExpense).length > 0 || 
               Object.keys(tempErrorsMedical).length > 0 || 
               Object.keys(tempErrorsHospitalCash).length > 0 || 
               Object.keys(tempErrorsPersonalAccident).length > 0){
 
                  setSnackbarOpen(true);
               }
  
           
            return ((Object.keys(tempErrorsGeneralProducts).length === 0) && 
            (Object.keys(tempErrorsEvacuationRepatriation).length === 0) && 
            (Object.keys(tempErrorsLastExpense).length === 0) && 
            (Object.keys(tempErrorsMedical).length === 0) && 
            (Object.keys(tempErrorsHospitalCash).length === 0) && 
            (Object.keys(tempErrorsPersonalAccident).length === 0)  );
          };

            // Initialize ref for step1
              const step1RefStoredData = useRef({});

              // Function to add or update form data
              const addFormData = (formType, data) => {
                step1RefStoredData.current = {
                  ...step1RefStoredData.current,
                  [formType]: data,
                };
              };

              // Handle next button click
              const handleNext = () => {

                // Validation logic
                if (validateStep()) {

                  // Store Step1 Data for each product type
                  if (activeStep === 0) {

                    // Store evacuation Repatriation FormData in localstorage
                    if (checkedAddProductItems.evacuationRepatriation) {
                      const evacuationRepatriationFormData = {
                         isActive: true,
                        coverType: formDataStep0EvacuationRepatriation.coverType,
                        policyStartDate: formDataStep0EvacuationRepatriation.policyStartDate,
                        selectedPlan: formDataStep0EvacuationRepatriation.selectedPlan,
                        premium:formDataStep0EvacuationRepatriation.premium,
                        coverAmount:formDataStep0EvacuationRepatriation.coverAmount
                      };
                      addFormData('evacuationRepatriation', evacuationRepatriationFormData);
                    } else if (!checkedAddProductItems.evacuationRepatriation) {
                      const evacuationRepatriationFormData = {
                        isActive: false,
                        coverType: "",
                        policyStartDate: "",
                        selectedPlan: "",
                        premium: "",
                        coverAmount: "",
                      };
                      addFormData('evacuationRepatriation', evacuationRepatriationFormData);
                    }

                    // Store lastExpense FormData in localstorage
                    if (checkedAddProductItems.lastExpense) {
                      const lastExpenseFormData = {
                        isActive: true,
                        coverType: formDataStep0LastExpense.coverType,
                        policyStartDate: formDataStep0LastExpense.policyStartDate,
                        selectedPlan: formDataStep0LastExpense.selectedPlan,
                        premium:formDataStep0LastExpense.premium,
                        coverAmount: formDataStep0LastExpense.coverAmount,
                      };
                      addFormData('lastExpense', lastExpenseFormData);
                    } else  if (!checkedAddProductItems.lastExpense) {
                      const lastExpenseFormData = {
                        isActive: false,
                        coverType: "",
                        policyStartDate: "",
                        selectedPlan: "",
                        premium: "",
                        coverAmount: "",
                      };
                      addFormData('lastExpense', lastExpenseFormData);
                    }
                
                    // Store medical FormDataa in localstorage
                    if (checkedAddProductItems.medical) {
                      const medicalFormData = {
                        isActive: true,
                        coverType: formDataStep0Medical.coverType,
                        dependantCount: formDataStep0Medical.dependantCount,
                        policyStartDate: formDataStep0Medical.policyStartDate,
                        selectedPlanInpatient: formDataStep0Medical.selectedPlanInpatient || "",
                        selectedPlanOutpatient: formDataStep0Medical.selectedPlanOutpatient || "",
                        selectedPlanDental: formDataStep0Medical.selectedPlanDental || "",
                        selectedPlanOptical: formDataStep0Medical.selectedPlanOptical || "",
                        premiumOutpatient: formDataStep0Medical.premiumOutpatient || "",
                        premiumInpatient:formDataStep0Medical.premiumInpatient || "",
                        premiumDental:formDataStep0Medical.premiumDental || "",
                        premiumOptical:formDataStep0Medical.premiumOptical || "",
                        coverAmountOutpatient: formDataStep0Medical.coverAmountOutpatient || "",
                        coverAmountInpatient:formDataStep0Medical.coverAmountInpatient || "",
                        coverAmountDental:formDataStep0Medical.coverAmountDental || "",
                        coverAmountOptical:formDataStep0Medical.coverAmountOptical || "",

                      };
                      addFormData('medical', medicalFormData);
                    } else if (!checkedAddProductItems.medical) {
                      const medicalFormData = {
                        isActive: false,
                        coverType: "",
                        dependantCount: "",
                        policyStartDate: "",
                        selectedPlanInpatient: "",
                        selectedPlanOutpatient: "",
                        selectedPlanDental: "",
                        selectedPlanOptical: "",
                        premiumOutpatient: "",
                        premiumInpatient: "",
                        premiumDental: "",
                        premiumOptical: "",
                        coverAmount:"",
                        coverAmountOutpatient: "",
                        coverAmountInpatient:"",
                        coverAmountDental:"",
                        coverAmountOptical:""

                      };
                      addFormData('medical', medicalFormData);
                    }

                    // Store hospitalCash FormData in localstorage
                    if (checkedAddProductItems.hospitalCash) {
                      const hospitalCashFormData = {
                        isActive: true,
                        dependantCount: formDataStep0HospitalCash.dependantCount,
                        coverType: formDataStep0HospitalCash.coverType,
                        policyStartDate: formDataStep0HospitalCash.policyStartDate,
                        selectedPlan: formDataStep0HospitalCash.selectedPlan,
                        premium:formDataStep0HospitalCash.premium,
                        coverAmount:formDataStep0HospitalCash.coverAmount
                      };
                      addFormData('hospitalCash', hospitalCashFormData);
                    } else if (!checkedAddProductItems.hospitalCash) {
                      const hospitalCashFormData = {
                        isActive: false,
                        dependantCount: "",
                        coverType: "",
                        policyStartDate: "",
                        selectedPlan: "",
                        premium: "",
                        coverAmount:""
                      };
                      addFormData('hospitalCash', hospitalCashFormData);
                    }

                    //  Store personal Accident Data in localstorage
                    if (checkedAddProductItems.personalAccident) {
                      const personalAccidentFormData = {
                        isActive: true,
                        coverType: formDataStep0PersonalAccident.coverType,
                        policyStartDate: formDataStep0PersonalAccident.policyStartDate,
                        selectedPlan: formDataStep0PersonalAccident.selectedPlan,
                        premium:formDataStep0PersonalAccident.premium,
                        coverAmount:formDataStep0PersonalAccident.coverAmount,
                      };
                      addFormData('personalAccident', personalAccidentFormData);
                    } else  if (!checkedAddProductItems.personalAccident) {
                      const personalAccidentFormData = {
                        isActive: false,
                        coverType: "",
                        policyStartDate: "",
                        selectedPlan: "",
                        premium: "",
                        coverAmount: ""
                      };
                      addFormData('personalAccident', personalAccidentFormData);
                    }

                    // Add Contact and Currency to FormData
                    const contactAndLoginsAndCurrencyData ={
                        firstName: contactAndLoginsAndCurrency.firstName,
                        currency: contactAndLoginsAndCurrency.currency,
                        email: contactAndLoginsAndCurrency.email,
                        currencyRate: conversionRates[contactAndLoginsAndCurrency.currency]
                    }
                    addFormData('contactAndLoginsAndCurrency', contactAndLoginsAndCurrencyData)
                    // Update checkedAddProductItems
                    addFormData('checkedAddProductItems', checkedAddProductItems);
                    // clear all form data first
                    localStorage.removeItem('step1');
                    // push All step1 Data to local storage
                    localStorage.setItem('step1', JSON.stringify(step1RefStoredData.current));
                  }

                  // Process Next Page
                  setActiveStep((prevActiveStep) => prevActiveStep + 1);
                  window.location.reload();

                }
              };

            // Handle back button click
              const handleBack = () => {
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
                window.location.reload();
              };
             

  return (
    <div >
      <div className="container mx-auto ">

        {/* Step 1 Forms Visibility Stops after Step 1 is Completed */}
        { activeStep === 0 && 
        <div className='p-1 mt-4' > 
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">

            {/* Proposer Name */}
            <div className="flex-1">
            <TextField
              required
              id="first-name"
              label="First Name"
              variant="outlined"
              fullWidth
              value={contactAndLoginsAndCurrency.firstName}
              onChange={(e) => {
                setContactAndLoginsAndCurrency({ ...contactAndLoginsAndCurrency, firstName: e.target.value });
                if (errorsGeneralProducts.firstName) {
                  setErrorsGeneralProducts({ ...errorsGeneralProducts, firstName: '' });
                }
              }}
              error={!!errorsGeneralProducts.firstName}
              helperText={errorsGeneralProducts.firstName}
            />
            </div>

            {/* Currency */}
            <div className="flex-1">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                id="currency"
                label="Currency"
                value={contactAndLoginsAndCurrency.currency}
                onChange={(e) => {
                  const selectedCurrency = e.target.value;

                  // Inline update for both states
                  setFormDataStep0LastExpense(prevState => ({
                    ...prevState,
                    currency: selectedCurrency
                  }));

                  setFormDataStep0EvacuationRepatriation(prevState => ({
                    ...prevState,
                    currency: selectedCurrency
                  }));

                  setFormDataStep0Medical(prevState => ({
                    ...prevState,
                    currency: selectedCurrency
                  }));

                  setFormDataStep0HospitalCash(prevState => ({
                    ...prevState,
                    currency: selectedCurrency
                  }));

                  setContactAndLoginsAndCurrency(prevState => ({
                    ...prevState,
                    currency: selectedCurrency
                  }));

                  setFormDataStep0PersonalAccident(prevState => ({
                    ...prevState,
                    currency: selectedCurrency
                  }));
                }}
              >
                <MenuItem value="KES">KES</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </FormControl>
            </div>

            {/* Login ID/Email */}
            <div className="flex-1">
            <TextField
              required
              id="start-email"
              label="Email"
              variant="outlined"
              fullWidth
              value={contactAndLoginsAndCurrency.email}
              onChange={(e) => {
                setContactAndLoginsAndCurrency({ ...contactAndLoginsAndCurrency, email: e.target.value });
                if (errorsGeneralProducts.email) {
                  setErrorsGeneralProducts({ ...errorsGeneralProducts, email: '' });
                }
              }}
              error={!!errorsGeneralProducts.email}
              helperText={errorsGeneralProducts.email}
            />
            </div>
            </div>
            </div>
            }

       <div> 
       {/* Importing Forms Of different Products from folder ../components */}
       { checkedAddProductItems.evacuationRepatriation === true &&  
          <Step0EvacuationRepatriation
          conversionRates = {conversionRates}
          contactAndLoginsAndCurrency = {contactAndLoginsAndCurrency}
          formDataStep0EvacuationRepatriation={formDataStep0EvacuationRepatriation}
          setFormDataStep0EvacuationRepatriation={setFormDataStep0EvacuationRepatriation}
          errors={errorsEvacuationRepatriation}
          setErrors={setErrorsEvacuationRepatriation}
          EvacuationRepatriationPlans={EvacuationRepatriationPlans}
          today={today}
        /> }

       { checkedAddProductItems.lastExpense === true &&   
        <Step0LastExpense 
         conversionRates = {conversionRates}
         contactAndLoginsAndCurrency = {contactAndLoginsAndCurrency}
         formDataStep0LastExpense={formDataStep0LastExpense}
         setFormDataStep0LastExpense={setFormDataStep0LastExpense}
         errors={errorsLastExpense}
         setErrors={setErrorsLastExpense}
         LastExpensePlans={LastExpensePlans}
         today={today}
       />  }

       { checkedAddProductItems.medical === true &&   
        <Step0Medical 
         conversionRates = {conversionRates}
         contactAndLoginsAndCurrency = {contactAndLoginsAndCurrency}
         formDataStep0Medical={formDataStep0Medical}
         setFormDataStep0Medical={setFormDataStep0Medical}
         errors={errorsMedical}
         setErrors={setErrorsMedical}
         MedicalPlans={MedicalPlans}
         today={today}
       />  }
 
 

      { checkedAddProductItems.hospitalCash  === true &&  
       <Step0HospitalCash 
         conversionRates = {conversionRates}
         contactAndLoginsAndCurrency = {contactAndLoginsAndCurrency}
         formDataStep0HospitalCash={formDataStep0HospitalCash}
         setFormDataStep0HospitalCash={setFormDataStep0HospitalCash}
         errors={errorsHospitalCash}
         setErrors={setErrorsHospitalCash}
         HospitalCashPlans={HospitalCashPlans}
         today={today}
       /> } 

       { checkedAddProductItems.personalAccident  === true &&  
       <Step0PersonalAccident 
         conversionRates = {conversionRates}
         contactAndLoginsAndCurrency = {contactAndLoginsAndCurrency}
         formDataStep0PersonalAccident={formDataStep0PersonalAccident}
         setFormDataStep0PersonalAccident={setFormDataStep0PersonalAccident}
         errors={errorsPersonalAccident}
         setErrors={setErrorsPersonalAccident}
         PersonalAccidentPlans={PersonalAccidentPlans}
         today={today}
       />} 

           {/* Checkboxes */}
           <div className="mt-2 shadow-div shadow-xl p-3">
            <h5 className="font-semibold mb-2">Add Other Products</h5>
            <div className='flex justify-center mb-4' >
            {!isAnyProductSelected() && (
              <Alert severity="error">
             Please select at least one product.
            </Alert>
            )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 mb-2 gap-2">
            <FormControlLabel
              control={
                <Checkbox
                  name="evacuationRepatriation"
                  checked={checkedAddProductItems.evacuationRepatriation}
                  onChange={handleCheckboxAddProduct}
                />
              }
              label="Evacuation Repatriation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="lastExpense"
                  checked={checkedAddProductItems.lastExpense}
                  onChange={handleCheckboxAddProduct}
                />
              }
              label="Last Expense"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="medical"
                  checked={checkedAddProductItems.medical}
                  onChange={handleCheckboxAddProduct}
                />
              }
              label="Medical"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hospitalCash"
                  checked={checkedAddProductItems.hospitalCash}
                  onChange={handleCheckboxAddProduct}
                />
              }
              label="Hospital Cash"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="personalAccident"
                  checked={checkedAddProductItems.personalAccident}
                  onChange={handleCheckboxAddProduct}
                />
              }
              label="Personal Accident"
            />
            </div>
            </div>


        </div>
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
              disabled={!isAnyProductSelected()} 
              variant="contained"
              color="primary"
              onClick={  handleNext}
              fullWidth
            >
              {activeStep === 6 - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>

        </div>
      </div>

     
       
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar} // Close the Snackbar after autoHideDuration
      >
        <Alert severity="info" sx={{ width: '100%' }} onClose={handleCloseSnackbar}>
          Please ensure all required fields are filled out correctly before proceeding .
        </Alert>
      </Snackbar>
       
     
    

    </div>
  );
};

export default Step0;


 