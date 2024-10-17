import React from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';


const Step2MedicalHistory = (
    {dependantFirstNames,
    dependantData ,
    handleChange ,
    medicalConditions}
) => {
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
                                                checked={dependantData[userIndex]?.medicalConditions?.some(cond => cond.name === condition.name) || false}
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
           
        </div>
    </div>
    );
};

export default Step2MedicalHistory;
