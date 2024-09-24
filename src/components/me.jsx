import React, { useState, useEffect } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const medicalConditions = [
    { name: "High Blood Pressure", action: "Decline", rate: "10%" },
    { name: "Heart Disease", action: "Load", rate: "10%" },
    { name: "High Cholesterol levels", action: "Load", rate: "10%" },
    { name: "Asthma", action: "Load", rate: "10%" },
    { name: "Chronic obstructive airway disease", action: "Load", rate: "10%" },
    { name: "Sinus Disease", action: "Load", rate: "10%" },
    { name: "Thyroid Disease", action: "Load", rate: "10%" },
    { name: "Diabetes Mellitus", action: "Load", rate: "10%" },
    { name: "Paralysis", action: "Load", rate: "10%" },
    { name: "Epilepsy", action: "Load", rate: "10%" },
    { name: "Sickle Cell", action: "Load", rate: "10%" },
    { name: "Disease Leukemia", action: "Load", rate: "10%" },
    { name: "Arthritis", action: "Load", rate: "10%" },
    { name: "Gout", action: "Load", rate: "10%" },
    { name: "Chronic back pain/slipped disc", action: "Load", rate: "10%" },
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

const Step2MedicalHistory = () => {
    const [dependantData, setDependantData] = useState([]);
    const [dependantFirstNames, setDependantFirstNames] = useState([]);

    useEffect(() => {
        const step2Data = localStorage.getItem('step2');
        if (step2Data) {
            const parsedData = JSON.parse(step2Data);
            const firstNames = parsedData.dependantPersonalData.map(dependant => dependant.firstName);
            const holderName = parsedData.firstName;

            setDependantFirstNames([holderName, ...firstNames]);

            const updatedDependantData = [parsedData, ...parsedData.dependantPersonalData].map(dependant => ({
                ...dependant,
                product: {
                    ...dependant.product,
                    medicalConditions: dependant.product?.medicalConditions || []
                }
            }));

            setDependantData(updatedDependantData);
        }
    }, []);

    const handleChange = (event, userIndex) => {
        const { value, checked } = event.target;
        const updatedDependantData = [...dependantData];

        const conditionData = medicalConditions.find(condition => condition.name === value);

        if (checked) {
            updatedDependantData[userIndex].product.medicalConditions.push({
                name: conditionData.name,
                action: conditionData.action,
                rate: conditionData.rate
            });
        } else {
            updatedDependantData[userIndex].product.medicalConditions = updatedDependantData[userIndex].product.medicalConditions.filter(
                condition => condition.name !== conditionData.name
            );
        }

        setDependantData(updatedDependantData);
    };

    
    const handleSave = () => {
        const step2Data = { ...dependantData[0], dependantPersonalData: dependantData.slice(1) };

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
                    dependant.productMedical = {
                        coverType: medicalPlan.coverType,
                        policyStartDate: medicalPlan.policyStartDate,
                        selectedPlan: medicalPlan.selectedPlan,
                        totalAmount: medicalPlan.totalAmount
                    };
                }
                
                // Check for evacuationRepatriation condition
                if (dependant.evacuationRepatriation) {
                    const evacuationPlan = storedPlans.evacuationRepatriation;
                    dependant.evacuationData = {
                        coverType: evacuationPlan.coverType,
                        policyStartDate: evacuationPlan.policyStartDate,
                        selectedPlan: evacuationPlan.selectedPlan,
                        totalAmount: evacuationPlan.totalAmount
                    };
                }

                // Check for lastExpense condition
                if (dependant.lastExpense) {
                    const lastExpensePlan = storedPlans.lastExpense;
                    dependant.lastExpenseData = {
                        coverType: lastExpensePlan.coverType,
                        policyStartDate: lastExpensePlan.policyStartDate,
                        selectedPlan: lastExpensePlan.selectedPlan,
                        totalAmount: lastExpensePlan.totalAmount
                    };
                }

                // Check for hospitalCash condition
                if (dependant.hospitalCash) {
                    const hospitalCashPlan = storedPlans.hospitalCash;
                    dependant.hospitalCashData = {
                        coverType: hospitalCashPlan.coverType,
                        policyStartDate: hospitalCashPlan.policyStartDate,
                        selectedPlan: hospitalCashPlan.selectedPlan,
                        totalAmount: hospitalCashPlan.totalAmount
                    };
                }

                // Check for personalAccident condition
                if (dependant.personalAccident) {
                    const personalAccidentPlan = storedPlans.personalAccident;
                    dependant.personalAccidentData = {
                        coverType: personalAccidentPlan.coverType,
                        policyStartDate: personalAccidentPlan.policyStartDate,
                        selectedPlan: personalAccidentPlan.selectedPlan,
                        totalAmount: personalAccidentPlan.totalAmount
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
                dependantPersonalData: userData.dependantPersonalData, // Processed dependant data
                productMedical: userData.productMedical,
                product: userData.product,
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

        // Store the final data back to local storage
        localStorage.setItem('QuotationData', JSON.stringify(finalData));


    };

    return (
        <div className='p-4'>
            <div className='mb-4'>
                <h5 className='font-semibold'>Medical History Questionnaire</h5>
                <p>Please tick if you suffer from any of the following conditions.</p>
            </div>
            <div className='shadow-div shadow-3xl'>
                {dependantFirstNames.length > 0 && (
                    <TableContainer style={{ padding: '4px' }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#157EBC', color: 'white' }}>
                                    <TableCell sx={{ padding: '8px', color: 'white' }}>Question No.</TableCell>
                                    <TableCell sx={{ padding: '8px', color: 'white' }}>Questions</TableCell>
                                    {dependantFirstNames.map((name, index) => (
                                        <TableCell sx={{ padding: '8px', color: 'white' }} key={index}>{name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {medicalConditions.map((condition, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ padding: '4px' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ padding: '4px' }}>{condition.name}</TableCell>
                                        {Array.from({ length: dependantFirstNames.length }, (_, userIndex) => (
                                            <TableCell sx={{ padding: '4px' }} key={userIndex}>
                                                <Checkbox
                                                    value={condition.name}
                                                    checked={dependantData[userIndex]?.product?.medicalConditions?.some(cond => cond.name === condition.name) || false}
                                                    onChange={(event) => handleChange(event, userIndex)}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save Medical History
                </Button>
            </div>
        </div>
    );
};

export default Step2MedicalHistory;
