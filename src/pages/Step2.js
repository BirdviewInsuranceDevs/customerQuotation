import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Step2Medicalhistory from '../components/Step2Medicalhistory';
import Step2ProposerHistory from '../components/Step2ProposerHistory';
import { Snackbar, Alert } from '@mui/material';

 
const medicalConditions = [
    { name: "High Blood Pressure", action: "Decline", rate: "10%" },
    { name: "Heart Disease", action: "Decline", rate: "10%" },
    { name: "High Cholesterol levels", action: "Decline", rate: "10%" },
    { name: "Asthma", action: "Decline", rate: "10%" },
    { name: "Chronic obstructive airway disease", action: "Decline", rate: "10%" },
    { name: "Sinus Disease", action: "Decline", rate: "10%" },
    { name: "Thyroid Disease", action: "Decline", rate: "10%" },
    { name: "Diabetes Mellitus", action: "Decline", rate: "10%" },
    { name: "Paralysis", action: "Decline", rate: "10%" },
    { name: "Epilepsy", action: "Decline", rate: "10%" },
    { name: "Sickle Cell", action: "Decline", rate: "10%" },
    { name: "Disease Leukemia", action: "Decline", rate: "10%" },
    { name: "Arthritis", action: "Decline", rate: "10%" },
    { name: "Gout", action: "Decline", rate: "10%" },
    { name: "Chronic back pain/slipped disc", action: "Decline", rate: "10%" },

    { name: "Liver Disease", action: "Load", rate: "10%" },
    { name: "Stomach and Duodenal Ulcers", action: "Load", rate: "10%" },
    { name: "Surgical Operations", action: "Load", rate: "10%" },
    { name: "Hospitalized (within the last seven years)", action: "Load", rate: "10%" },
    { name: "On Regular Medication", action: "Load", rate: "10%" },
    { name: "Cancer", action: "Load", rate: "10%" },
    { name: "Pelvic Inflammatory disease (female)", action: "Load", rate: "10%" },
    { name: "Fibroids (Female)", action: "Load", rate: "10%" },
    { name: "Enlargement of the prostate (male)", action: "Load", rate: "10%" },
    { name: "History of Caesarian", action: "Load", rate: "10%" },
    { name: "Section Pregnant Member", action: "Load", rate: "10%" },
    { name: "Other medical conditions or disabilities not mentioned Above", action: "Load", rate: "10%" },
    { name: "Stroke", action: "Load", rate: "10%" },
    { name: "Kidney Failure", action: "Load", rate: "10%" },
    { name: "Organ Transplant", action: "Load", rate: "10%" },
    { name: "Brain Tumours", action: "Load", rate: "10%" }
];


const Step2 = () => {
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep ? parseInt(savedStep, 10) : 0;
    });


    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
    }, [activeStep]);

    const [dependantData, setDependantData] = useState([]);
    const [dependantFirstNames, setDependantFirstNames] = useState([]);
    const data = JSON.parse(localStorage.getItem('step1'));
    const evacuationRepatriationActive = data?.evacuationRepatriation?.isActive;
    const lastExpenseActive = data?.lastExpense?.isActive;
    const medicalActive = data?.medical?.isActive;
    const hospitalCashActive = data?.hospitalCash?.isActive;
    const personalAccidentActive = data?.personalAccident?.isActive;
    const [proposerHistoryData, setProposerHistoryData] = useState([]);
  
    

    useEffect(() => {
        const step2Data = localStorage.getItem('step2');
        if (step2Data) {
            const parsedData = JSON.parse(step2Data);
            const firstNames = parsedData.dependantPersonalData.map(dependant => dependant.firstName);
            const holderName = parsedData.firstName;

            setDependantFirstNames([holderName, ...firstNames]);

            const updatedDependantData = [parsedData, ...parsedData.dependantPersonalData].map(dependant => ({
                ...dependant,
                medicalConditions: dependant.medicalConditions || [] // Moved medicalConditions to the top level
            }));

            setDependantData(updatedDependantData);
        }
    }, []);

    const handleChange = (event, userIndex) => {
        const { value, checked } = event.target;
        const updatedDependantData = [...dependantData];

        const conditionData = medicalConditions.find(condition => condition.name === value);

        if (checked) {
            updatedDependantData[userIndex].medicalConditions.push({
                name: conditionData.name,
                action: conditionData.action,
                rate: conditionData.rate
            });
        } else {
            updatedDependantData[userIndex].medicalConditions = updatedDependantData[userIndex].medicalConditions.filter(
                condition => condition.name !== conditionData.name
            );
        }

        setDependantData(updatedDependantData);
    };
    
    const handleSaveData = () => {
        const step2Data = { ...dependantData[0], dependantPersonalData: dependantData.slice(1) };
        // delete current previous data
        localStorage.removeItem('step2');
        localStorage.setItem('step2', JSON.stringify(step2Data));

        // Retrieve data from local storage
        const storedPlans = JSON.parse(localStorage.getItem('step1'));
        const userData = JSON.parse(localStorage.getItem('step2'));

        // Function to update dependantPersonalData with plan details
        function updateDependantData(storedPlans, userData) {
            const { dependantPersonalData } = userData;

            dependantPersonalData.forEach(dependant => {
                // Check for medical condition
                if (dependant.medical) {
                    const medicalPlan = storedPlans.medical;
                    dependant.medicalData = {
                        coverType: medicalPlan.coverType,
                        policyStartDate: medicalPlan.policyStartDate,
                        selectedPlanInpatient: medicalPlan.selectedPlanInpatient,
                        selectedPlanOutpatient: medicalPlan.selectedPlanOutpatient,
                        selectedPlanDental: medicalPlan.selectedPlanDental,
                        selectedPlanOptical: medicalPlan.selectedPlanOptical,
                        premiumOutpatient: medicalPlan.premiumOutpatient,
                        premiumInpatient:medicalPlan.premiumInpatient,
                        premiumDental:medicalPlan.premiumDental,
                        premiumOptical:medicalPlan.premiumOptical,
                    };
                }else if (!dependant.medical) {
                    const medicalPlan = storedPlans.medical;
                    dependant.medicalData = {
                        coverType: "",
                        policyStartDate: "",
                        selectedPlan: "",
                        selectedPlanInpatient: "",
                        selectedPlanOutpatient: "",
                        selectedPlanDental: "",
                        selectedPlanOptical: "",
                        premiumOutpatient: "",
                        premiumInpatient: "",
                        premiumDental: "",
                        premiumOptical: "",
                    };
                }
                
                // Check for evacuationRepatriation condition
                if (dependant.evacuationRepatriation) {
                    const evacuationPlan = storedPlans.evacuationRepatriation;
                    dependant.evacuationData = {
                        coverType: evacuationPlan.coverType,
                        policyStartDate: evacuationPlan.policyStartDate,
                        selectedPlan: evacuationPlan.selectedPlan,
                        premium: evacuationPlan.premium
                    };
                } else if (!dependant.evacuationRepatriation) {
                    const evacuationPlan = storedPlans.evacuationRepatriation;
                    dependant.evacuationData = {
                        coverType:  "",
                        policyStartDate: "",
                        selectedPlan:  "",
                        premium:  ""
                    };
                }

                // Check for lastExpense condition
                if (dependant.lastExpense) {
                    const lastExpensePlan = storedPlans.lastExpense;
                    dependant.lastExpenseData = {
                        coverType: lastExpensePlan.coverType,
                        policyStartDate: lastExpensePlan.policyStartDate,
                        selectedPlan: lastExpensePlan.selectedPlan,
                        premium: lastExpensePlan.premium
                    };
                } else if (!dependant.lastExpense) {
                    const lastExpensePlan = storedPlans.lastExpense;
                    dependant.lastExpenseData = {
                        coverType:  "",
                        policyStartDate:  "",
                        selectedPlan:  "",
                        premium:  ""
                    };
                }

                // Check for hospitalCash condition
                if (dependant.hospitalCash) {
                    const hospitalCashPlan = storedPlans.hospitalCash;
                    dependant.hospitalCashData = {
                        coverType: hospitalCashPlan.coverType,
                        policyStartDate: hospitalCashPlan.policyStartDate,
                        selectedPlan: hospitalCashPlan.selectedPlan,
                        premium: hospitalCashPlan.premium
                    };
                }  if (!dependant.hospitalCash) {
                    const hospitalCashPlan = storedPlans.hospitalCash;
                    dependant.hospitalCashData = {
                        coverType: "",
                        policyStartDate: "",
                        selectedPlan: "",
                        premium: ""
                    };
                }

                // Check for personalAccident condition
                if (dependant.personalAccident) {
                    const personalAccidentPlan = storedPlans.personalAccident;
                    const hospitalCashPlan = storedPlans.hospitalCash; //added this line, error was hospitalcashPlan is not defined

                    dependant.personalAccidentData = {
                        coverType: personalAccidentPlan.coverType,
                        policyStartDate: personalAccidentPlan.policyStartDate,
                        selectedPlan: personalAccidentPlan.selectedPlan,
                        premium: hospitalCashPlan.premium
                    };
                } else if (!dependant.personalAccident) {
                    const personalAccidentPlan = storedPlans.personalAccident;
                    dependant.personalAccidentData = {
                        coverType: "",
                        policyStartDate: "",
                        selectedPlan: "",
                        premium: ""
                    };
                }
            });

            return userData;
        }

        // Update the data
        const updatedUserData = updateDependantData(storedPlans, userData);

        // Function to consolidate data for storage
        function consolidateData(userData, storedPlans) {
            const consolidatedData = {
                title: userData.title,
                firstName: userData.firstName,
                middleName: userData.middleName,
                surname: userData.surname,
                dob: userData.dob,
                gender: userData.gender,
                nationality: userData.nationality,
                countryofResidence: userData.countryofResidence,
                nationalIDPassportNo: userData.nationalIDPassportNo,
                nhif: userData.nhif,
                pin: userData.pin,
                employer: userData.employer,
                postalAddress: userData.postalAddress,
                code: userData.code,
                town: userData.town,
                occupation: userData.occupation,
                mobileNo: userData.mobileNo,
                otherPhone: userData.otherPhone,
                email: userData.email,
                dependantPersonalData: userData.dependantPersonalData,  
                productMedical: userData.productMedical,
                medicalConditions: userData.medicalConditions,
                evacuationRepatriation: storedPlans.evacuationRepatriation,
                lastExpense: storedPlans.lastExpense,
                medical: storedPlans.medical,
                hospitalCash: storedPlans.hospitalCash,
                personalAccident: storedPlans.personalAccident
            };

            return consolidatedData;
        }
        // Consolidate the data
        const finalData = consolidateData(updatedUserData, storedPlans);
        // delete current previous data
        localStorage.removeItem('QuotationData');
        // Store the final data back to local storage
        localStorage.setItem('QuotationData', JSON.stringify(finalData));
    };


    const MedicalHistoryValidations = ()=>{
              // Retrieve the stored data from local storage
             const data = JSON.parse(localStorage.getItem('step2'));
  
            // Check for principal's medical conditions
            const hasDeclineInPrincipal = data.medicalConditions.some(condition => condition.action === "Decline");
          
            // Check for dependants' medical conditions
            const hasDeclineInDependants = data.dependantPersonalData.some(dependant => 
              dependant.medicalConditions.some(condition => condition.action === "Decline")
            );
           
            // Return true if either the principal or any dependant has declined medical conditions
            return (!hasDeclineInPrincipal && !hasDeclineInDependants);

    }

     const proposerHistoryDataValidation = (data) =>{

        const errors = [];

        // Loop through each key in the data object
        for (const key in data) {
            const item = data[key];
    
            // Check if item is an object (for questions) or an array (for dependents)
            if (Array.isArray(item)) {
                // Validate each dependent
                item.forEach((dependent, index) => {
                    if (!dependent.name) {
                        errors.push(`Dependent ${index + 1}: Name is required.`);
                    }
                    if (!dependent.age || isNaN(dependent.age) || dependent.age < 0) {
                        errors.push(`Dependent ${index + 1}: Age must be a positive number.`);
                    }
                    if (!dependent.relationship) {
                        errors.push(`Dependent ${index + 1}: Relationship is required.`);
                    }
                    // You can add more validation rules for dependents here
                });
            } else if (typeof item === 'object') {
                // Validate questions
                if (!item.answer) {
                    errors.push(`${item.question} Answer is required.`);
                }
                // Additional validations for details if necessary
                if (item.details && typeof item.details !== 'string') {
                    errors.push(`${item.question} Details must be a string.`);
                }
            }
        }
    
        return errors;


     }

    
     const handleNext = () => {
        // Save the data to local storage
        handleSaveData();

        // Validate proposer's history before moving to the next step
        let validationErrors = 0;
           if (personalAccidentActive){
          validationErrors = proposerHistoryDataValidation(proposerHistoryData);

           }
        // Output the errors, if any
        if (validationErrors.length > 0) {
            // Prepare the snackbar message
            setSnackbarMessage(`Proposers Errors: ${validationErrors.join(', ')}`);
            setOpenSnackbar(true);  
          } else {
            //   TODO: Chech why Pernal Accident is not included
            // Validate medical history before moving to the next step
            if (MedicalHistoryValidations()) {
                // Ifpersonal Accident Active
                const doubleCheckPeronalAccident = JSON.parse(localStorage.getItem('step1'));
                const confirmPersonalAccident = doubleCheckPeronalAccident?.personalAccident?.isActive;
                if (confirmPersonalAccident){
                const data = JSON.parse(localStorage.getItem('QuotationData'));
                //   data.proposerHistoryData  // commented this line , is there supposed to be an assignment?
                  
                    // Clear local Storage Data
                    localStorage.removeItem('QuotationData');
                    // Step 4: Save the updated object back to local storage
                    localStorage.setItem('QuotationData', JSON.stringify(data));

                     // Proceed to the next step
                     setActiveStep((prevActiveStep) => prevActiveStep + 1);
                     window.location.reload(); 
                 }else {

                // Proceed to the next step
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                 window.location.reload(); 
                 }
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.location.reload();
    };

    return (
           <>
           { (evacuationRepatriationActive || lastExpenseActive || medicalActive || hospitalCashActive) &&
            <Step2Medicalhistory 
            dependantFirstNames={dependantFirstNames}
            dependantData ={dependantData}
            handleChange={handleChange}
            medicalConditions={medicalConditions}
            
            />
            }

            { personalAccidentActive  &&
            
            <Step2ProposerHistory setProposerHistoryData={setProposerHistoryData} />
            }
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

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>

            </div>
        </>
    );
};

export default Step2;
