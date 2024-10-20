import React ,{useEffect} from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Alert } from '@mui/material'; 
import DeselectIcon from '@mui/icons-material/Deselect';


const Step0PersonalAccident = ({
        conversionRates,
        contactAndLoginsAndCurrency,
        formDataStep0PersonalAccident,
        setFormDataStep0PersonalAccident,
        errors,
        setErrors,
        PersonalAccidentPlans 
      }) => {  
          const today = new Date().toISOString().split('T')[0]; 

         
          // convertor Function
          const convertAmount = (amount) => {
               //  Convert to number
              const amountclean = parseInt(amount);
            // Convert to selected currency
            let convertedAmount ='';
            if(contactAndLoginsAndCurrency.currency === 'KES' ){ 
             convertedAmount =`Ksh. ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString() }`;
            }
            else if(contactAndLoginsAndCurrency.currency === 'USD' ){ 
             convertedAmount =`$ ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString()}`;
      
            }
            else if(contactAndLoginsAndCurrency.currency === 'EUR' ){ 
             convertedAmount =`€ ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString()}`;
      
            }
            else if(contactAndLoginsAndCurrency.currency === 'GBP' ){ 
             convertedAmount =`£ ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString()}`;
      
            }
            return convertedAmount;
          };

          useEffect(() => {
            const selectedPlan = PersonalAccidentPlans.find(plan => plan.id === formDataStep0PersonalAccident.selectedPlan);
            if (selectedPlan) {
              const totalAmount = conversionRates[contactAndLoginsAndCurrency.currency] * ((0.0025 * Number(Number(selectedPlan.premium))) + (0.002 * Number(Number(selectedPlan.premium))) + (Number(selectedPlan.premium)) +(40));
              setFormDataStep0PersonalAccident(prevState => ({
                ...prevState,
                totalAmount
              })); 


              const { coverAmount, premium } = selectedPlan;   
              setFormDataStep0PersonalAccident(prevState => ({
                ...prevState,
                coverAmount:  (Number(coverAmount)  * conversionRates[contactAndLoginsAndCurrency.currency] ),  
                premium: Number((premium * conversionRates[contactAndLoginsAndCurrency.currency])) 
              }));

            }
          }, [formDataStep0PersonalAccident.selectedPlan,setFormDataStep0PersonalAccident, PersonalAccidentPlans]);
          

            //  Deselect all previous Selected plans
              const handleDeselectPlans = () =>{
                setFormDataStep0PersonalAccident(prevState => ({
                ...prevState,
                  selectedPlan: null,
                  premium: null,
                }));
              }
      
    return (
      <div className="bg-white p-2 shadow-div shadow-3xl  mt-1">
        <form className="mt-4">
          <hr className="my-4 bg-gray-900"   />
          <div className='mb-4'>
            <h5 className='font-semibold'>Personal Accident</h5>  
          </div>
  
          {/* Cover Type */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mb-2 gap-2">
            <div className="flex-1">
              <FormControl fullWidth variant="outlined" error={!!errors.coverType}>
                <InputLabel id="cover-type-label">Cover Type</InputLabel>
                <Select
                  labelId="cover-type-label"
                  id="cover-type"
                  label="Cover Type"
                  value={formDataStep0PersonalAccident.coverType}
                  onChange={(e) => {
                    setFormDataStep0PersonalAccident({ ...formDataStep0PersonalAccident, coverType: e.target.value });
                    if (errors.coverType) {
                      setErrors({ ...errors, coverType: '' });
                    }
                  }}
                >
                  <MenuItem value="per-person">Per-person Cover</MenuItem>
                </Select>
                {errors.coverType && (
                  <FormHelperText sx={{ fontSize: '0.75rem', color: 'error.main' }}>
                    {errors.coverType}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
  
          {/* Policy Start Date */}
          <div className="flex-1">
                <TextField
                  label="DOB"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: { min: today }, // Assuming `today` is a valid date string like 'YYYY-MM-DD'
                  }}
                  required
                  value={formDataStep0PersonalAccident?.policyStartDate || ''} // Use an empty string if null/undefined
                  onChange={(event) => {
                    const newValue = event.target.value; // Get the string value from the event
                    setFormDataStep0PersonalAccident({
                      ...formDataStep0PersonalAccident,
                      policyStartDate: newValue,
                    });

                    // Clear error if a valid date is selected
                    if (errors.policyStartDate) {
                      setErrors({ ...errors, policyStartDate: '' });
                    }
                  }}
                  error={!!errors.policyStartDate}
                  helperText={errors.policyStartDate} // Show the actual error message
                />
              </div>

          </div>
  
          {/* Product Options Table */}
          <div className="mt-6">
            <h5 className=" font-semibold mb-2">Product Options</h5>
            <TableContainer component={Paper} className="overflow-x-auto">
              <Table size="small">
                {/* Table Head */}
                <TableHead>
                  <TableRow style={{ backgroundColor: '#157EBC', color: 'white' }}>
                    <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Plan</TableCell>
                    <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Cover Amount</TableCell>
                    <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Premium (Base)</TableCell>
                    <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', padding: '8px' }}>
                                                {(formDataStep0PersonalAccident.selectedPlan === null)
                                                  ? (
                                                    'Select'
                                                  ) : (
                                                    <DeselectIcon onClick={handleDeselectPlans}  />
                                                  )}
                                                </TableCell>
                  </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody>
                  {PersonalAccidentPlans.map((plan) => (
                    <TableRow
                      key={plan.id}
                      style={{
                        backgroundColor: plan.id === formDataStep0PersonalAccident.selectedPlan ? '#388e3c' : 'inherit',
                        color: plan.id === formDataStep0PersonalAccident.selectedPlan ? '#ffffff' : 'inherit',
                      }}
                      onClick={() => setFormDataStep0PersonalAccident({ ...formDataStep0PersonalAccident, selectedPlan: plan.id })}

                    >
                      <TableCell align="center" sx={{color: plan.id === formDataStep0PersonalAccident.selectedPlan ? 'white' : 'inherit' }}>{plan.plan}</TableCell>
                      <TableCell align="center" sx={{color: plan.id === formDataStep0PersonalAccident.selectedPlan ? 'white' : 'inherit' }}>{convertAmount(plan.coverAmount)}</TableCell>
                      <TableCell align="center" sx={{color: plan.id === formDataStep0PersonalAccident.selectedPlan ? 'white' : 'inherit' }}>{convertAmount(plan.premium)}</TableCell>
                      <TableCell align="center" sx={{color: plan.id === formDataStep0PersonalAccident.selectedPlan ? 'white' : 'inherit' }}>
                       
                          {plan.id === formDataStep0PersonalAccident.selectedPlan ? (
                            <CheckCircleOutlineIcon />
                          ) : (
                            <CheckBoxOutlineBlankIcon />
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {errors.selectedPlan && (
             <Alert severity="error">
             {errors.selectedPlan}
            </Alert>
            )}
          </div>
  
          {/* Container for two-column layout on large screens */}
          <div className="mt-6 flex flex-col lg:flex-row lg:gap-6">
            {/* Product Summary */}
            {formDataStep0PersonalAccident.selectedPlan && (
                <div className="flex flex-col p-4 border rounded-lg shadow-md bg-white lg:w-1/2">
                  <div className="border-b border-gray-300 pb-2 mb-2">
                    <h2 className="text-xl font-semibold mb-4">Premium Summary</h2>
                  </div>
                  <div className="flex flex-col gap-4 text-sm text-gray-700">
                    {/* Display summary based on selected plan */}
                    {PersonalAccidentPlans.filter(plan => plan.id === formDataStep0PersonalAccident.selectedPlan).map(plan => (
                      <div key={plan.id}>
                        <h3 className="font-medium font-semibold ">Last Expense Premium Summary</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-700 border-t ">
                          <div className="flex justify-between border-b  pt-2 border-gray-300 pb-2 mb-2">
                            <span className="font-medium">Premium</span>
                            <span>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the premium amount with thousands separators
                                  const formattedPremium = Number(formDataStep0PersonalAccident.premium).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedPremium}
                                    </>
                                  );
                                })()}
                              </span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">ITL</span>
                            <span>{ conversionRates[contactAndLoginsAndCurrency.currency] * (0.002 * Number(plan.premium))  || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">PCF</span>
                            <span>{ conversionRates[contactAndLoginsAndCurrency.currency] * (0.0025 * Number(plan.premium) ) || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">Stamp Duty</span>
                            <span>{ conversionRates[contactAndLoginsAndCurrency.currency] * 40 || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">TOTAL</span>
                            <span>
                          <b>
                            {(() => {
                              // Map currency codes to their symbols
                              const currencySymbols = {
                                KES: 'Ksh.',
                                USD: '$',
                                EUR: '€',
                                GBP: '£',
                              };

                              // Get the currency symbol based on the current currency
                              const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                              // Format the total amount with thousands separators
                              const formattedTotalAmount = Number(formDataStep0PersonalAccident.totalAmount).toLocaleString() || 'N/A';

                              return (
                                <>
                                  {currencySymbol} {formattedTotalAmount}
                                </>
                              );
                            })()}
                          </b>
                        </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

  
            {/* Disclaimer */}
            <div className={`lg:w-1/2 ${formDataStep0PersonalAccident.selectedPlan ? 'lg:pl-6' : ''}`}>
              <p className="text-sm text-gray-600 mt-6 lg:mt-0">
                <b>DISCLAIMER:</b> The premium shown is approximate and should be used for illustrative and general information purposes only. The final premium amount may change and will be determined accurately after further assessment.
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  };

 export default Step0PersonalAccident;