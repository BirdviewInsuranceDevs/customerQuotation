import React, { useState, useEffect } from 'react';
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

const medicalConditions = [
    "High Blood Pressure",
    "Heart Disease",
    "High Cholesterol levels",
    "Asthma",
    "Chronic obstructive airway disease",
    "Sinus Disease",
    "Thyroid Disease",
    "Diabetes Mellitus",
    "Paralysis",
    "Epilepsy",
    "Sickle Cell",
    "Disease Leukemia",
    "Arthritis",
    "Gout",
    "Chronic back pain/slipped disc",
    "Liver Disease",
    "Stomach and Duodenal Ulcers",
    "Surgical Operations",
    "Hospitalized (within the last seven years)",
    "On Regular Medication",
    "Cancer",
    "Pelvic Inflammatory disease (female)",
    "Fibroids (Female)",
    "Enlargement of the prostate (male)",
    "History of Caesarian",
    "Section Pregnant Member",
    "Other medical conditions or disabilities not mentioned Above",
    "Stroke",
    "Kidney Failure",
    "Organ Transplant",
    "Brain Tumours"
];

const Step2Medicalhistory = () => {
    const [dependantCount, setDependantCount] = useState(0); // Does not include holder
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [dependantFirstNames, setDependantFirstNames] = useState([]);

    useEffect(() => {
        const step2Data = localStorage.getItem('step2');
        if (step2Data) {
            const parsedData = JSON.parse(step2Data);
            const firstNames = parsedData.dependantPersonalData.map(dependant => dependant.firstName);
            const count = parsedData.dependantPersonalData.length;

            // Add the holder to the dependants array
            setDependantCount(count);
            setDependantFirstNames(["Holder", ...firstNames]); // "Holder" will act as first dependant
            
            // Initialize selectedConditions for holder and dependants
            setSelectedConditions(Array.from({ length: count + 1 }, () => [])); 

            // Load existing conditions if available in step3
            const step3Data = localStorage.getItem('step3');
            if (step3Data) {
                const conditionsData = JSON.parse(step3Data);
                const updatedConditions = Array.from({ length: count + 1 }, () => []); // +1 to include holder
                conditionsData.forEach(item => {
                    updatedConditions[item.dependantNo] = item.conditions;
                });
                setSelectedConditions(updatedConditions);
            }
        }
    }, []);

    const handleChange = (event, userIndex) => {
        const { value, checked } = event.target;
        const updatedConditions = [...selectedConditions];

        if (!updatedConditions[userIndex]) {
            updatedConditions[userIndex] = [];
        }

        if (checked) {
            updatedConditions[userIndex] = [...updatedConditions[userIndex], value];
        } else {
            updatedConditions[userIndex] = updatedConditions[userIndex].filter(
                (condition) => condition !== value
            );
        }

        setSelectedConditions(updatedConditions);
    };

    const handleSave = () => {
        const step3Data = selectedConditions.map((conditions, index) => ({
            dependantNo: index,  // Holder is also considered a dependant (dependantNo = 0)
            conditions,
        }));
        localStorage.setItem('step3', JSON.stringify(step3Data));
        alert('Medical history saved successfully!');
    };

    return (
        <div className='p-4'>
            <div className='mb-4'>
                <h5 className='font-semibold'>Medical History Questionnaire</h5>
                <p>Please tick if you suffer from any of the following conditions.</p>
            </div>
            {/* Only render table if dependantFirstNames has data */}
            {dependantFirstNames.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Question No.</TableCell>
                                <TableCell>Questionnaire Questions</TableCell>
                                {dependantFirstNames.map((name, index) => (
                                    <TableCell key={index}>{name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicalConditions.map((condition, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{condition}</TableCell>
                                    {Array.from({ length: dependantCount + 1 }, (_, userIndex) => (
                                        <TableCell key={userIndex}>
                                            <Checkbox
                                                value={condition}
                                                checked={selectedConditions[userIndex]?.includes(condition)}
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
    );
};

export default Step2Medicalhistory;
